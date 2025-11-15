
# Register your models here.
from django.contrib import admin
from .models import DiabetesRecord

@admin.register(DiabetesRecord)
class DiabetesRecordAdmin(admin.ModelAdmin):
    list_display = (
        "id", "age", "bmi", "waist_cm", "fbs",
        "total_score", "risk_category", "created_at"
    )
    list_filter = ("risk_category", "sex_assigned_at_birth")
    search_fields = ("id",)
