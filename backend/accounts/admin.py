from django.contrib import admin
from .models import Account

# Register your models here.

class AccountAdmin(admin.ModelAdmin):
    fieldsets = [
        ('User', {'fields': ('email', 'name', 'last_name')}),
        ('Contact', {'fields': ('phone_no',)}),
        ('Permission', {'fields': ('role',)}),
    ]

    list_filter = ('name', 'last_name', 'role')

    list_display = ('name', 'last_name', 'email', 'role')

admin.site.register(Account, AccountAdmin)