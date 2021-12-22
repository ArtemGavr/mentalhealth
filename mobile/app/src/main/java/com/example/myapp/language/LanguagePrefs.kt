package com.example.myapp.language
import android.content.Context

const val PREFERENCE_NAME = "SharedPreferenceExample"
const val PREFERENCE_LANGUAGE = "Language"

class LanguagePrefs(context: Context) {
    private val preference = context.getSharedPreferences(PREFERENCE_NAME, Context.MODE_PRIVATE)

    fun getLoginCount(): String {
        return preference.getString(PREFERENCE_LANGUAGE, "en")!!
    }

    fun setLogin(Language: String) {
        val editor = preference.edit()
        editor.putString(PREFERENCE_LANGUAGE, Language)
        editor.apply()
    }
}
