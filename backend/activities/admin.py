from django.contrib import admin
from .models import Activity, Participant

# Register your models here.

class ActivityAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Info', {'fields': ('title', 'description')}),
        ('Date', {'fields': ('datetime',)}),
        ('Lecturer', {'fields': ('id_lecturer',)}),
        ('Details', {'fields': ('period', 'participant_no', 'id_business')}),
    ]

    list_filter = (
        ('datetime', admin.DateFieldListFilter),
        'id_lecturer',
        'period',
        'id_business'
    )

    list_display = ('title', 'datetime', 'id_lecturer', 'period', 'id_business')


class ParticipantAdmin(admin.ModelAdmin):
    fieldsets = [
        ('Info', {'fields': ('id_participant', 'id_class')}),
    ]

    list_filter = ('id_participant', 'id_class')

    list_display = ('id_participant', 'id_class')


admin.site.register(Activity, ActivityAdmin)
admin.site.register(Participant, ParticipantAdmin)