package com.example.myapp.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.myapp.R
import com.example.myapp.database.Database.Companion.id
import com.example.myapp.database.Database.Companion.token
import com.example.myapp.getRText
import com.example.myapp.models.Mood
import com.example.myapp.models.User
import com.example.myapp.services.ResultService
import com.example.myapp.services.ServiceBuilder
import com.example.myapp.services.UserService
import kotlinx.android.synthetic.main.activity_profile.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ProfileActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_profile)

        val context = this
        supportActionBar?.hide()

        val userService = ServiceBuilder.buildService(UserService::class.java)
        val request = userService.getUser(id)

        request.enqueue(object: Callback<User> {
            override fun onResponse(call: Call<User>, response: Response<User>) {
                if (response.isSuccessful) {
                    val data = response.body()!!
                    profile_email.text = data.email
                    profile_name.setText(data.name)
                    profile_surname.setText(data.surname)
                    profile_job.setText(data.jobTitle)
                }
            }

            override fun onFailure(call: Call<User>, t: Throwable) {}
        })

        profile_update.setOnClickListener {
            val req = userService.updateUser(id, User(profile_name.text.toString(), profile_surname.text.toString(), null, profile_job.text.toString()))
            req.enqueue(object: Callback<User> {
                override fun onResponse(call: Call<User>, response: Response<User>) {
                    if (response.isSuccessful) {
                        Toast.makeText(context, getRText(context, "successfully"), Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<User>, t: Throwable) {}
            })
        }
    }
}