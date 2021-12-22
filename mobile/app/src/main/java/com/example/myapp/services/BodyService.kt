package com.example.myapp.services

import com.example.myapp.models.ParamModel
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.Header
import retrofit2.http.POST

interface BodyService {
    @GET("bodies")
    fun getParams(@Header("Authorization") token: String): Call<List<ParamModel>>

    @POST("bodies")
    fun sendParam(@Header("Authorization") token: String, @Body body: ParamModel): Call<ParamModel>
}