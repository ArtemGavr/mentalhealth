package com.example.myapp

import android.content.Context
import android.content.res.Resources

fun getRText(context: Context, idName: String?): String? {
    val res: Resources = context.resources
    return res.getString(res.getIdentifier(idName, "string", context.packageName))
}