# Generated by Django 5.1.4 on 2024-12-16 22:41

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='account_number',
            field=models.CharField(max_length=36, unique=True),
        ),
    ]
