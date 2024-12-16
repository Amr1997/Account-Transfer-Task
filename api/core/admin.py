from django.contrib import admin
from .models import Account


@admin.register(Account)
class AccountAdmin(admin.ModelAdmin):
    list_display = ('account_number', 'name', 'balance')
    search_fields = ('account_number', 'name')
    list_filter = ('balance',)
