package com.example.myapp.services

import com.example.myapp.models.LoginRequest
import com.example.myapp.models.LoginResponse
import com.example.myapp.models.RegisterRequest
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.POST

interface AuthService {
    @POST("patient/login")
    fun login(@Body body: LoginRequest): Call<LoginResponse>

    @POST("patient")
    fun register(@Body body: RegisterRequest): Call<LoginResponse>
}