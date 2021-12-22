package com.example.myapp.services

import com.example.myapp.models.Mood
import com.example.myapp.models.Results
import retrofit2.Call
import retrofit2.http.GET
import retrofit2.http.Header

interface ResultService {
    @GET("results")
    fun getResults(@Header("Authorization") token: String): Call<Results>
}