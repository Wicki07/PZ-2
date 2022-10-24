from django.contrib import admin
from .models import Activity, Participant

# Register your models here.


class ActivityAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Info', {'fields': ('title', 'description')}),
        ('Date', {'fields': ('datetime',)}),
        ('Lecturer', {'fields': ('account',)}),
        ('Details', {'fields': ('period', 'participant_number', 'business')}),
    ]

    list_filter = (
        ('datetime', admin.DateFieldListFilter),
        'account',
        'period',
        'business'
    )

    list_display = ('title', 'datetime', 'account', 'period', 'business')


class ParticipantAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Info', {'fields': ('account_id', 'activity_id')}),
    ]

    list_filter = ('account_id', 'activity_id')

    list_display = ('account_id', 'activity_id')


admin.site.register(Activity, ActivityAdmin)
admin.site.register(Participant, ParticipantAdmin)