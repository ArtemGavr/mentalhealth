package com.example.myapp

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.myapp.activities.HomeActivity
import com.example.myapp.activities.RegisterActivity
import com.example.myapp.database.Database.Companion.id
import com.example.myapp.database.Database.Companion.token
import com.example.myapp.models.LoginRequest
import com.example.myapp.models.LoginResponse
import com.example.myapp.services.AuthService
import com.example.myapp.services.ServiceBuilder
import kotlinx.android.synthetic.main.activity_main.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)

        val context = this
        supportActionBar?.hide()

        val authService = ServiceBuilder.buildService(AuthService::class.java)

        registerAccount.setOnClickListener {
            val intent = Intent(context, RegisterActivity::class.java)
            startActivity(intent)
        }

        signInButton.setOnClickListener {
            val request = authService.login(LoginRequest(signInUsername.text.toString(), signInPassword.text.toString()))
            request.enqueue(object: Callback<LoginResponse> {
                override fun onResponse(
                    call: Call<LoginResponse>,
                    response: Response<LoginResponse>
                ) {
                    if (response.isSuccessful) {
                        val data = response.body()!!
                        id = data.patientWithEmail._id
                        token = data.token

                        val intent = Intent(context, HomeActivity::class.java)
                        startActivity(intent)
                    } else {
                        Toast.makeText(context, getRText(context, "weop"), Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<LoginResponse>, t: Throwable) {}
            })
        }
    }
}