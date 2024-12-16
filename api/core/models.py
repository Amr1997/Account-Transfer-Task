from django.db import models


class Account(models.Model):
    account_number = models.CharField(max_length=36, unique=True)
    name = models.CharField(max_length=100)
    balance = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f"{self.account_number} - {self.name}"
