package com.example.myapp.activities

import android.content.Intent
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.myapp.MainActivity
import com.example.myapp.R
import com.example.myapp.getRText
import com.example.myapp.models.LoginResponse
import com.example.myapp.models.RegisterRequest
import com.example.myapp.services.AuthService
import com.example.myapp.services.ServiceBuilder
import kotlinx.android.synthetic.main.activity_register.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class RegisterActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_register)

        val context = this
        supportActionBar?.hide()

        val authService = ServiceBuilder.buildService(AuthService::class.java)

        login_register.setOnClickListener {
            val intent = Intent(context, MainActivity::class.java)
            startActivity(intent)
        }

        registerButton.setOnClickListener {
            val request = authService.register(
                RegisterRequest(
                    r_name.text.toString(),
                    r_surname.text.toString(),
                    r_password.text.toString(),
                    r_email.text.toString(),
                    r_job.text.toString()
                )
            )
            request.enqueue(object: Callback<LoginResponse> {
                override fun onResponse(
                    call: Call<LoginResponse>,
                    response: Response<LoginResponse>
                ) {
                    if (response.isSuccessful) {
                        Toast.makeText(context, getRText(context, "successfully"), Toast.LENGTH_SHORT).show()
                        val intent = Intent(context, MainActivity::class.java)
                        startActivity(intent)
                    }
                }

                override fun onFailure(call: Call<LoginResponse>, t: Throwable) {}
            })
        }
    }
}