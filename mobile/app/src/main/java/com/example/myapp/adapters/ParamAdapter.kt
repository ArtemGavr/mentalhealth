package com.example.myapp.adapters

import android.annotation.SuppressLint
import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ArrayAdapter
import android.widget.TextView
import com.example.myapp.R
import com.example.myapp.getRText
import com.example.myapp.models.ParamModel

class ParamsAdapter (var mCtx: Context, private val resources: Int, private val items: List<ParamModel>):
    ArrayAdapter<ParamModel>(mCtx, resources, items) {
    @SuppressLint("ViewHolder", "SetTextI18n")
    override fun getView(position: Int, convertView: View?, parent: ViewGroup): View {
        val layoutInflater: LayoutInflater = LayoutInflater.from(mCtx)
        val view: View = layoutInflater.inflate(resources, null)

        val weight: TextView = view.findViewById(R.id.params_w)
        val height: TextView = view.findViewById(R.id.params_h)

        val mItem = items[position]

        weight.text = getRText(mCtx, "weight") + ": " + mItem.weight
        height.text = getRText(mCtx, "height") + ": " + mItem.height
        return view
    }
}