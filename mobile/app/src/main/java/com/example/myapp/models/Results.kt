package com.example.myapp.models

data class Results(
    val hr_p : Number,
    val temp_p : Number,
    val weightIsOk : Number,
    val stress_p : Number,
    val anxiety_p : Number,
    val depression_p : Number,
    val general_p : Number,
    val happiness_p : Number,
    val mentalInstruction : Number,
    val severity_p : Number,
    val message: String
)
