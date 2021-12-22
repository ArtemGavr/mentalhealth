package com.example.myapp.services

import com.example.myapp.models.Diary
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

interface DiariesService {
    @GET("diaries")
    fun getDiaries(@Header("Authorization") token: String): Call<List<Diary>>

    @POST("diaries")
    fun addDiary(@Header("Authorization") token: String, @Body body: Diary): Call<Diary>
}