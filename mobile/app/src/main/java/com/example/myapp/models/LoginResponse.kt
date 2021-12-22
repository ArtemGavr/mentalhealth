package com.example.myapp.models

data class LoginResponse(
    val token: String,
    val patientWithEmail: PatientWithEmail,
)

data class PatientWithEmail(
    val _id: String,
)
