# Register your models here.
from django.contrib import admin
from import_export import resources
from import_export.admin import ImportExportModelAdmin
from .models import DiabetesRecord


# Resource class for export
class DiabetesRecordResource(resources.ModelResource):
    class Meta:
        model = DiabetesRecord
        # (Optional) You can specify fields manually or leave as default
        fields = (
            "id", "age", "height_cm", "weight_kg", "bmi",
            "waist_cm", "sex_assigned_at_birth", "physical_activity",
            "daily_fruit_veg", "bp_medication", "high_blood_sugar_history",
            "family_history", "fbs", "total_score", "risk_category",
            "created_at"
        )


# Admin with import-export included
@admin.register(DiabetesRecord)
class DiabetesRecordAdmin(ImportExportModelAdmin):
    resource_class = DiabetesRecordResource

    list_display = (
        "id", "age", "bmi", "waist_cm", "fbs",
        "total_score", "risk_category", "created_at"
    )
    list_filter = ("risk_category", "sex_assigned_at_birth")
    search_fields = ("id",)
