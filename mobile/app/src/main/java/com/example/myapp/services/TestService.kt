package com.example.myapp.services

import com.example.myapp.models.Mood
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.Header
import retrofit2.http.POST
import retrofit2.http.Path

interface TestService {
    @POST("moods/{id}")
    fun sendTest(@Header("Authorization") token: String, @Body body: Mood, @Path("id") id: String): Call<Mood>
}