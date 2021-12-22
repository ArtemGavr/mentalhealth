package com.example.myapp.services

import com.example.myapp.models.Health
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header

interface HealthService {
    @GET("healthParams/last")
    fun getHealth(@Header("Authorization") token: String): Call<Health>
}