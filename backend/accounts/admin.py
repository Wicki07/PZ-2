from django.contrib import admin
from .models import Account

# Register your models here.

class AccountAdmin(admin.ModelAdmin):
    fieldsets = [
        ('User', {'fields': ('email', 'name', 'lastname')}),
        ('Contact', {'fields': ('phone_no',)}),
        ('Permission', {'fields': ('role',)}),
    ]

    list_filter = ('name', 'lastname', 'role')

    list_display = ('name', 'lastname', 'email', 'role')

admin.site.register(Account, AccountAdmin)
