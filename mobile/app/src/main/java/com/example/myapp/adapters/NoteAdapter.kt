package com.example.myapp.adapters

import android.annotation.SuppressLint
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.TextView
import com.example.myapp.R
import com.example.myapp.models.Diary

class NoteAdapter (var mCtx: Context, private val resources: Int, private val items: List<Diary>):
    ArrayAdapter<Diary>(mCtx, resources, items) {
    @SuppressLint("ViewHolder")
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val layoutInflater: LayoutInflater = LayoutInflater.from(mCtx)
        val view: View = layoutInflater.inflate(resources, null)

        val note: TextView = view.findViewById(R.id.note_text)

        val mItem = items[position]

        note.text = mItem.note
        return view
    }
}