from django.contrib.auth import get_user_model
from django.db import transaction
from rest_framework import serializers

from profiles.models import (
    Availability,
    Job,
    ProfessionalProfile,
    Sector,
)

User = get_user_model()


class RegisterSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        write_only=True,
        min_length=8,
    )

    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    phone = serializers.CharField(
        max_length=30,
        required=False,
        allow_blank=True,
    )

    city = serializers.CharField(max_length=120)
    postal_code = serializers.CharField(
        max_length=20,
        required=False,
        allow_blank=True,
    )

    sectors = serializers.ListField(
        child=serializers.CharField(),
        allow_empty=False,
    )

    jobs = serializers.ListField(
        child=serializers.DictField(),
        allow_empty=False,
    )

    available_now = serializers.BooleanField(default=False)

    days = serializers.ListField(
        child=serializers.ChoiceField(
            choices=Availability.Day.choices
        ),
        allow_empty=False,
    )

    time_slots = serializers.ListField(
        child=serializers.ChoiceField(
            choices=Availability.TimeSlot.choices
        ),
        allow_empty=False,
    )

    mobility_radius = serializers.IntegerField(
        min_value=1,
        max_value=500,
        default=20,
    )

    def validate_email(self, value):
        email = value.strip().lower()

        if User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError(
                "Un compte existe déjà avec cette adresse e-mail."
            )

        return email

    def validate_sectors(self, values):
        values = list(dict.fromkeys(values))

        existing = set(
            Sector.objects.filter(
                slug__in=values,
                is_active=True,
            ).values_list("slug", flat=True)
        )

        missing = set(values) - existing

        if missing:
            raise serializers.ValidationError(
                f"Secteur(s) inconnu(s) : {', '.join(sorted(missing))}"
            )

        return values

    def validate_jobs(self, values):
        cleaned_jobs = []
        seen = set()

        for item in values:
            sector = item.get("sector")
            slug = item.get("slug")

            if not sector or not slug:
                raise serializers.ValidationError(
                    "Chaque métier doit contenir 'sector' et 'slug'."
                )

            key = (sector, slug)

            if key in seen:
                continue

            seen.add(key)

            if not Job.objects.filter(
                sector__slug=sector,
                slug=slug,
                is_active=True,
            ).exists():
                raise serializers.ValidationError(
                    f"Métier inconnu : {sector}/{slug}"
                )

            cleaned_jobs.append({
                "sector": sector,
                "slug": slug,
            })

        return cleaned_jobs

    def validate(self, attrs):
        selected_sectors = set(attrs["sectors"])

        for job in attrs["jobs"]:
            if job["sector"] not in selected_sectors:
                raise serializers.ValidationError({
                    "jobs": (
                        f"Le métier '{job['slug']}' appartient au secteur "
                        f"'{job['sector']}', qui n'a pas été sélectionné."
                    )
                })

        return attrs

    @transaction.atomic
    def create(self, validated_data):
        sector_slugs = validated_data.pop("sectors")
        jobs_data = validated_data.pop("jobs")
        days = validated_data.pop("days")
        time_slots = validated_data.pop("time_slots")

        city = validated_data.pop("city")
        postal_code = validated_data.pop(
            "postal_code",
            "",
        )

        available_now = validated_data.pop(
            "available_now",
            False,
        )

        mobility_radius = validated_data.pop(
            "mobility_radius",
            20,
        )

        password = validated_data.pop("password")

        user = User.objects.create_user(
            password=password,
            account_type=User.AccountType.PROFESSIONAL,
            **validated_data,
        )

        profile = ProfessionalProfile.objects.create(
            user=user,
            city=city,
            postal_code=postal_code,
            available_now=available_now,
            mobility_radius=mobility_radius,
            profile_completed=True,
        )

        sectors = Sector.objects.filter(
            slug__in=sector_slugs,
            is_active=True,
        )

        profile.sectors.set(sectors)

        jobs = []

        for job_data in jobs_data:
            job = Job.objects.get(
                sector__slug=job_data["sector"],
                slug=job_data["slug"],
                is_active=True,
            )
            jobs.append(job)

        profile.jobs.set(jobs)

        availabilities = []

        for day in days:
            for time_slot in time_slots:
                availabilities.append(
                    Availability(
                        profile=profile,
                        day=day,
                        time_slot=time_slot,
                    )
                )

        Availability.objects.bulk_create(
            availabilities,
            ignore_conflicts=True,
        )

        return user
