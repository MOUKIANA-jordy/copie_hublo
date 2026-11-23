from django.conf import settings
from django.db import models


class Sector(models.Model):
    name = models.CharField(
        max_length=100,
        unique=True,
        verbose_name="Nom",
    )

    slug = models.SlugField(
        max_length=100,
        unique=True,
    )

    icon = models.CharField(
        max_length=20,
        blank=True,
        verbose_name="Icône",
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["name"]
        verbose_name = "Secteur"
        verbose_name_plural = "Secteurs"

    def __str__(self):
        return self.name


class Job(models.Model):
    sector = models.ForeignKey(
        Sector,
        on_delete=models.CASCADE,
        related_name="jobs",
        verbose_name="Secteur",
    )

    name = models.CharField(
        max_length=120,
        verbose_name="Métier",
    )

    slug = models.SlugField(
        max_length=120,
    )

    is_active = models.BooleanField(
        default=True,
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    class Meta:
        ordering = ["sector__name", "name"]
        constraints = [
            models.UniqueConstraint(
                fields=["sector", "slug"],
                name="unique_job_per_sector",
            )
        ]
        verbose_name = "Métier"
        verbose_name_plural = "Métiers"

    def __str__(self):
        return f"{self.name} — {self.sector.name}"


class ProfessionalProfile(models.Model):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="professional_profile",
    )

    sectors = models.ManyToManyField(
        Sector,
        related_name="professionals",
        blank=True,
    )

    jobs = models.ManyToManyField(
        Job,
        related_name="professionals",
        blank=True,
    )

    city = models.CharField(
        max_length=120,
        blank=True,
        verbose_name="Ville",
    )

    postal_code = models.CharField(
        max_length=20,
        blank=True,
        verbose_name="Code postal",
    )

    mobility_radius = models.PositiveIntegerField(
        default=20,
        verbose_name="Rayon de mobilité en km",
    )

    available_now = models.BooleanField(
        default=False,
        verbose_name="Disponible maintenant",
    )

    bio = models.TextField(
        blank=True,
        verbose_name="Présentation",
    )

    profile_completed = models.BooleanField(
        default=False,
        verbose_name="Profil complété",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    def __str__(self):
        return f"Profil de {self.user.email}"


class Availability(models.Model):
    class Day(models.TextChoices):
        MONDAY = "lundi", "Lundi"
        TUESDAY = "mardi", "Mardi"
        WEDNESDAY = "mercredi", "Mercredi"
        THURSDAY = "jeudi", "Jeudi"
        FRIDAY = "vendredi", "Vendredi"
        SATURDAY = "samedi", "Samedi"
        SUNDAY = "dimanche", "Dimanche"

    class TimeSlot(models.TextChoices):
        MORNING = "matin", "Matin"
        AFTERNOON = "apres-midi", "Après-midi"
        EVENING = "soir", "Soir"
        NIGHT = "nuit", "Nuit"

    profile = models.ForeignKey(
        ProfessionalProfile,
        on_delete=models.CASCADE,
        related_name="availabilities",
    )

    day = models.CharField(
        max_length=20,
        choices=Day.choices,
    )

    time_slot = models.CharField(
        max_length=20,
        choices=TimeSlot.choices,
    )

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=["profile", "day", "time_slot"],
                name="unique_profile_availability",
            )
        ]
        verbose_name = "Disponibilité"
        verbose_name_plural = "Disponibilités"

    def __str__(self):
        return (
            f"{self.profile.user.email} - "
            f"{self.get_day_display()} - "
            f"{self.get_time_slot_display()}"
        )
