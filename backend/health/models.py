
# Create your models here.

from django.db import models

class DiabetesRecord(models.Model):

    # 1. Age
    age = models.PositiveIntegerField()

    # 2. BMI (you may calculate it in frontend)
    height_cm = models.FloatField()
    weight_kg = models.FloatField()
    bmi = models.FloatField()

    # 3. Waist circumference + sex assigned at birth
    waist_cm = models.FloatField()
    sex_assigned_at_birth = models.CharField(
        max_length=10,
        choices=[("male", "Male"), ("female", "Female")]
    )

    # 4. Physical activity ≥30 min/day
    physical_activity = models.BooleanField()  # True = Yes, False = No

    # 5. Daily fruit/vegetable intake
    daily_fruit_veg = models.BooleanField()    # True = Yes, False = No

    # 6. Taking medication for high BP
    bp_medication = models.BooleanField()      # True = Yes, False = No

    # 7. History of high blood sugar
    high_blood_sugar_history = models.BooleanField()  # True = Yes, False = No

    # 8. Family history
    family_history = models.CharField(
        max_length=10,
        choices=[
            ("zero", "No Family History"),
            ("second", "2nd-degree Relative"),
            ("first", "1st-degree Relative")
        ],
        blank=True,
        null=True,
    )

    # 9. ADA Fasting Blood Sugar (mg/dL)
    fbs = models.FloatField()   # numeric fasting blood sugar

    # Final computed score and risk category sent from frontend
    total_score = models.IntegerField()
    risk_category = models.CharField(max_length=20)

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Record #{self.id} – Score: {self.total_score}"
