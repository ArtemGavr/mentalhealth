package com.example.myapp.services

import com.example.myapp.models.User
import retrofit2.Call
import retrofit2.http.Body
import retrofit2.http.GET
import retrofit2.http.PUT
import retrofit2.http.Path

interface UserService {
    @GET("patient/{id}")
    fun getUser(@Path("id") id: String): Call<User>

    @PUT("patient/{id}")
    fun updateUser(@Path("id") id: String, @Body body: User): Call<User>
}