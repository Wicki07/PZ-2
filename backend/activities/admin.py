from django.contrib import admin
from .models import Activity, Participant

# Register your models here.

class ActivityAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Info', {'fields': ('title', 'description')}),
        ('Date', {'fields': ('datetime',)}),
        ('Lecturer', {'fields': ('account_id',)}),
        ('Details', {'fields': ('period', 'participant_no', 'business_id')}),
    ]

    list_filter = (
        ('datetime', admin.DateFieldListFilter),
        'account_id',
        'period',
        'business_id'
    )

    list_display = ('title', 'datetime', 'account_id', 'period', 'business_id')


class ParticipantAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Info', {'fields': ('participant_id_id', 'activity_id')}),
    ]

    list_filter = ('participant_id_id', 'activity_id')

    list_display = ('participant_id_id', 'activity_id')


admin.site.register(Activity, ActivityAdmin)
admin.site.register(Participant, ParticipantAdmin)