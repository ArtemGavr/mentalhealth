package com.example.myapp.models

data class RegisterRequest(
    val name: String,
    val surname: String,
    val password: String,
    val email: String,
    val jobTitle: String,
)
