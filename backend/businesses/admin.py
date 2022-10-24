from django.contrib import admin
from .models import Business

# Register your models here.
class BusinessAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Business', {'fields': ('name', 'email')}),
        ('Contact', {'fields': ('phone_no',)}),
        ('Detail', {'fields': ('theme',)}),
    ]

    list_filter = ('theme',)

    list_display = ('name', 'email', 'theme')

admin.site.register(Business, BusinessAdmin)
