package com.example.myapp.activities

import android.app.NotificationChannel
import android.app.NotificationManager
import android.content.Context
import android.content.Intent
import android.os.Build
import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import androidx.core.app.NotificationCompat
import androidx.core.app.NotificationManagerCompat
import com.example.myapp.MainActivity
import com.example.myapp.R
import com.example.myapp.database.Database
import com.example.myapp.language.LanguagePrefs
import com.example.myapp.language.MyContextWrapper
import com.example.myapp.models.Health
import com.example.myapp.services.HealthService
import com.example.myapp.services.ServiceBuilder
import kotlinx.android.synthetic.main.activity_home.*
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class HomeActivity : AppCompatActivity() {

    lateinit var languagePrefs: LanguagePrefs
    private val languageList: Array<String> = arrayOf("uk", "en")
    private val CHANNEL_ID = "channel_id_example_01"
    private val notificationId = 101
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_home)
        val context = this

        languagePrefs = LanguagePrefs(context)

        val healthService = ServiceBuilder.buildService(HealthService::class.java)
        val q = healthService.getHealth("Bearer ${Database.token}")

        createNotificationChannel()

        val t: Thread = object: Thread() {
            override fun run() {
                try {
                    while (!isInterrupted) {
                        runOnUiThread {
                            q.clone().enqueue(object: Callback<Health> {
                                override fun onResponse(call: Call<Health>, response: Response<Health>) {
                                    if (response.isSuccessful) {
                                        val data = response.body()!!
                                        if (data.temp > 38) {
                                            sendNotification()
                                        }

                                        if (data.hr > 100) {
                                            sendNotification()
                                        }
                                    }
                                }

                                override fun onFailure(call: Call<Health>, t: Throwable) {}
                            })
                        }
                        sleep(15000)
                    }
                } catch (e: InterruptedException) {

                }
            }
        }
        t.start()

        supportActionBar?.hide()

        profile_menu.setOnClickListener {
            val intent = Intent(context, ProfileActivity::class.java)
            startActivity(intent)
        }

        param_menu.setOnClickListener {
            val intent = Intent(context, ParamsActivity::class.java)
            startActivity(intent)
        }

        note_menu.setOnClickListener {
            val intent = Intent(context, NoteActivity::class.java)
            startActivity(intent)
        }

        test_menu.setOnClickListener {
            val intent = Intent(context, TestActivity::class.java)
            startActivity(intent)
        }

        logout_menu.setOnClickListener {
            val intent = Intent(context, MainActivity::class.java)
            startActivity(intent)
        }

        en_menu.setOnClickListener {
            languagePrefs.setLogin(languageList[1])
            val intent = Intent(context, HomeActivity::class.java)
            startActivity(intent)
        }

        uk_menu.setOnClickListener {
            languagePrefs.setLogin(languageList[0])
            val intent = Intent(context, HomeActivity::class.java)
            startActivity(intent)
        }
    }

    private fun createNotificationChannel() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            val name = "My app"
            val description = "Check your health: heart rate, temp!"
            val importance = NotificationManager.IMPORTANCE_DEFAULT
            val channel = NotificationChannel(CHANNEL_ID, name, importance).apply {
                description
            }

            val notificationManager: NotificationManager = getSystemService(Context.NOTIFICATION_SERVICE) as NotificationManager
            notificationManager.createNotificationChannel(channel)
        }
    }

    private fun sendNotification() {
        val builder = NotificationCompat.Builder(this, CHANNEL_ID)
            .setSmallIcon(R.drawable.ic_launcher_background)
            .setContentTitle("My app")
            .setContentText("Check your heart rate and tempreture!")
            .setPriority(NotificationCompat.PRIORITY_DEFAULT)

        with(NotificationManagerCompat.from(this)) {
            notify(notificationId, builder.build())
        }
    }

    override fun attachBaseContext(newBase: Context?) {
        languagePrefs = LanguagePrefs(newBase!!)
        val lang = languagePrefs.getLoginCount()
        super.attachBaseContext(MyContextWrapper.wrap(newBase, lang))
    }
}