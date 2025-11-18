from django.shortcuts import render

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import DiabetesRecord


@api_view(["POST"])

def save_record(request):
    data = request.data

    required = ["age","height_cm","weight_kg","bmi","waist_cm","sex_assigned_at_birth","fbs","total_score","risk_category"]
    missing = [k for k in required if k not in data or data.get(k) in [None, ""]]
    if missing:
        return Response({"error": f"Missing fields: {missing}"}, status=status.HTTP_400_BAD_REQUEST)


    try:
        record = DiabetesRecord.objects.create(
            age = data.get("age"),
            height_cm = data.get("height_cm"),
            weight_kg = data.get("weight_kg"),
            bmi = data.get("bmi"),

            waist_cm = data.get("waist_cm"),
            sex_assigned_at_birth = data.get("sex_assigned_at_birth"),

          
            daily_fruit_veg = data.get("daily_fruit_veg"),
            bp_medication = data.get("bp_medication"),
            high_blood_sugar_history = data.get("high_blood_sugar_history"),

            physical_activity = data.get("physical_activity"),
            family_history = data.get("family_history"),
            systolic = data.get("systolic"),

            diastolic = data.get("diastolic"),
            pulse = data.get("pulse"),
            fbs = data.get("fbs"),

            total_score = data.get("total_score"),
            risk_category = data.get("risk_category")
        )

    except Exception as e:
        return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

    return Response({"message": "saved", "id": record.id}, status=status.HTTP_201_CREATED)
