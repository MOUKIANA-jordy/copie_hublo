from django.contrib.auth.models import AbstractUser, BaseUserManager
from django.db import models


class UserManager(BaseUserManager):
    use_in_migrations = True

    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("L'adresse e-mail est obligatoire.")

        email = self.normalize_email(email)

        user = self.model(
            email=email,
            **extra_fields,
        )

        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(
                "Le superutilisateur doit avoir is_staff=True."
            )

        if extra_fields.get("is_superuser") is not True:
            raise ValueError(
                "Le superutilisateur doit avoir is_superuser=True."
            )

        return self.create_user(
            email,
            password,
            **extra_fields,
        )


class User(AbstractUser):
    class AccountType(models.TextChoices):
        PROFESSIONAL = "PROFESSIONAL", "Professionnel"
        COMPANY = "COMPANY", "Entreprise"

    username = None

    email = models.EmailField(
        unique=True,
        verbose_name="Adresse e-mail",
    )

    first_name = models.CharField(
        max_length=150,
        verbose_name="Prénom",
    )

    last_name = models.CharField(
        max_length=150,
        verbose_name="Nom",
    )

    phone = models.CharField(
        max_length=30,
        blank=True,
        verbose_name="Téléphone",
    )

    account_type = models.CharField(
        max_length=20,
        choices=AccountType.choices,
        default=AccountType.PROFESSIONAL,
        verbose_name="Type de compte",
    )

    is_verified = models.BooleanField(
        default=False,
        verbose_name="Compte vérifié",
    )

    created_at = models.DateTimeField(
        auto_now_add=True,
    )

    updated_at = models.DateTimeField(
        auto_now=True,
    )

    USERNAME_FIELD = "email"

    REQUIRED_FIELDS = [
        "first_name",
        "last_name",
    ]

    objects = UserManager()

    def __str__(self):
        return self.email
