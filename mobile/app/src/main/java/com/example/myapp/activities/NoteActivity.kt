package com.example.myapp.activities

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import android.widget.ListView
import com.example.myapp.R
import com.example.myapp.adapters.NoteAdapter
import com.example.myapp.database.Database.Companion.token
import com.example.myapp.models.Diary
import com.example.myapp.services.DiariesService
import com.example.myapp.services.ServiceBuilder
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class NoteActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_note)

        val context = this
        supportActionBar?.hide()

        val noteService = ServiceBuilder.buildService(DiariesService::class.java)

        val request = noteService.getDiaries("Bearer $token")

        val button: Button = findViewById(R.id.note_save_button)

        request.enqueue(object: Callback<List<Diary>> {
            override fun onResponse(call: Call<List<Diary>>, response: Response<List<Diary>>) {
                if (response.isSuccessful) {
                    val data = response.body()!!
                    val list = mutableListOf<Diary>()

                    data.forEach { el ->
                        list.add(Diary(el.note))
                    }

                    val noteList = findViewById<ListView>(R.id.note_list)
                    noteList.adapter = NoteAdapter(context, R.layout.note_view, list)
                }
            }

            override fun onFailure(call: Call<List<Diary>>, t: Throwable) {}
        })

        button.setOnClickListener {
            val noteText: EditText = findViewById(R.id.editText)
            val req = noteService.addDiary("Bearer $token", Diary(noteText.text.toString()))

            req.enqueue(object: Callback<Diary> {
                override fun onResponse(call: Call<Diary>, response: Response<Diary>) {
                    if (response.isSuccessful) {
                        val q = noteService.getDiaries("Bearer $token")
                        q.enqueue(object: Callback<List<Diary>> {
                            override fun onResponse(call: Call<List<Diary>>, response: Response<List<Diary>>) {
                                val data = response.body()!!
                                val list = mutableListOf<Diary>()

                                data.forEach { el ->
                                    list.add(Diary(el.note))
                                }

                                val noteList = findViewById<ListView>(R.id.note_list)
                                noteList.adapter = NoteAdapter(context, R.layout.note_view, list)
                            }

                            override fun onFailure(call: Call<List<Diary>>, t: Throwable) {}
                        })
                    }
                }

                override fun onFailure(call: Call<Diary>, t: Throwable) {}
            })
        }

    //TODO make display
    }
}