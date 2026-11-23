from django.contrib import admin

from .models import (
    Availability,
    Job,
    ProfessionalProfile,
    Sector,
)


@admin.register(Sector)
class SectorAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "slug",
        "is_active",
    )

    list_filter = (
        "is_active",
    )

    search_fields = (
        "name",
    )

    prepopulated_fields = {
        "slug": ("name",),
    }


@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    list_display = (
        "name",
        "sector",
        "is_active",
    )

    list_filter = (
        "sector",
        "is_active",
    )

    search_fields = (
        "name",
        "sector__name",
    )

    prepopulated_fields = {
        "slug": ("name",),
    }


@admin.register(ProfessionalProfile)
class ProfessionalProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "city",
        "available_now",
        "mobility_radius",
        "profile_completed",
    )

    list_filter = (
        "available_now",
        "profile_completed",
        "sectors",
    )

    search_fields = (
        "user__email",
        "user__first_name",
        "user__last_name",
        "city",
    )

    filter_horizontal = (
        "sectors",
        "jobs",
    )


@admin.register(Availability)
class AvailabilityAdmin(admin.ModelAdmin):
    list_display = (
        "profile",
        "day",
        "time_slot",
    )

    list_filter = (
        "day",
        "time_slot",
    )
