package com.example.myapp.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ListView
import com.example.myapp.R
import com.example.myapp.adapters.ParamsAdapter
import com.example.myapp.database.Database.Companion.token
import com.example.myapp.models.ParamModel
import com.example.myapp.services.BodyService
import com.example.myapp.services.ServiceBuilder
import kotlinx.android.synthetic.main.activity_params.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class ParamsActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_params)

        val context = this
        supportActionBar?.hide()

        val paramsService = ServiceBuilder.buildService(BodyService::class.java)
        val params = paramsService.getParams("Bearer $token")

        params.enqueue(object: Callback<List<ParamModel>> {
            override fun onResponse(
                call: Call<List<ParamModel>>,
                response: Response<List<ParamModel>>
            ) {
                if (response.isSuccessful) {
                    val data = response.body()!!
                    val list = mutableListOf<ParamModel>()

                    data.forEach { el ->
                        list.add(ParamModel(el.weight, el.height, true))
                    }

                    params_list.adapter = ParamsAdapter(context, R.layout.param_view, list)
                }
            }

            override fun onFailure(call: Call<List<ParamModel>>, t: Throwable) {}
        })

        val button: Button = findViewById(R.id.add_param)
        button.setOnClickListener {
            val weight: EditText = findViewById(R.id.params_weight)
            val height: EditText = findViewById(R.id.params_height)

            val req = paramsService.sendParam("Bearer $token", ParamModel(
                weight.text.toString().toFloat(), height.text.toString().toFloat(), true
            ))
            req.enqueue(object: Callback<ParamModel> {
                override fun onResponse(call: Call<ParamModel>, response: Response<ParamModel>) {
                    if (response.isSuccessful) {
                        val q = paramsService.getParams("Bearer $token")
                        q.enqueue(object: Callback<List<ParamModel>> {
                            override fun onResponse(
                                call: Call<List<ParamModel>>,
                                response: Response<List<ParamModel>>
                            ) {
                                if (response.isSuccessful) {
                                    val data = response.body()!!
                                    val list = mutableListOf<ParamModel>()

                                    data.forEach { el ->
                                        list.add(ParamModel(el.weight, el.height, true))
                                    }

                                    params_list.adapter = ParamsAdapter(context, R.layout.param_view, list)
                                }
                            }

                            override fun onFailure(call: Call<List<ParamModel>>, t: Throwable) {}
                        })
                    }
                }

                override fun onFailure(call: Call<ParamModel>, t: Throwable) {}
            })
        }
    }
}