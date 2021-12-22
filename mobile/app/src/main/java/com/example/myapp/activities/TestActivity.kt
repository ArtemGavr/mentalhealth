package com.example.myapp.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Toast
import com.example.myapp.R
import com.example.myapp.database.Database.Companion.id
import com.example.myapp.database.Database.Companion.token
import com.example.myapp.getRText
import com.example.myapp.models.Mood
import com.example.myapp.services.ServiceBuilder
import com.example.myapp.services.TestService
import kotlinx.android.synthetic.main.activity_test.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class TestActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_test)

        val context = this
        supportActionBar?.hide()

        val testService = ServiceBuilder.buildService(TestService::class.java)

        send_mood_test.setOnClickListener {
            val request = testService.sendTest("Bearer $token", Mood(
                s_rate.text.toString().toInt(), a_rate.text.toString().toInt(),
                d_rate.text.toString().toInt(), g_rate.text.toString().toInt(),
                h_rate.text.toString().toInt()
            ), id) // TODO wrong id

            request.enqueue(object: Callback<Mood> {
                override fun onResponse(call: Call<Mood>, response: Response<Mood>) {
                    if (response.isSuccessful) {
                        Toast.makeText(context, getRText(context, "successfully"), Toast.LENGTH_SHORT).show()
                    }
                }

                override fun onFailure(call: Call<Mood>, t: Throwable) {}
            })
        }
    }
}