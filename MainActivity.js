import android.Manifest;
import android.app.Activity;
import android.content.pm.PackageManager;
import android.os.Bundle;
import android.os.CountDownTimer;
import android.support.v4.app.ActivityCompat;
import android.support.v4.content.ContextCompat;
import android.telephony.SmsManager;
import android.view.View;
import android.widget.TextView;
import android.widget.Button;

public class MainActivity extends Activity {

    //SMS message variables
    String etmessage = "Intruder has Entered the Base";
    //destination telephone number
    String etTelNr = "7543675392";
    int MY_PERMISSIONS_REQUEST_SEND_SMS = 1;

    //Count down Variables
    private TextView CountdownText;
    private Button countdownbutton;

    private CountDownTimer countDownTimer;
    private long timeLeftMillis = 120000;
    private boolean timeRunning;

    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.layout);

        CountdownText = findViewById(R.id.timertext);
        countdownbutton = findViewById(R.id.Start);

        countdownbutton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                startStop();

                //Programming to send Sms message when start button is clicked
                if(ContextCompat.checkSelfPermission(MainActivity.this, Manifest.permission.SEND_SMS) !=
                        PackageManager.PERMISSION_GRANTED)
                {
                    ActivityCompat.requestPermissions(MainActivity.this, new String[]
                            {Manifest.permission.SEND_SMS},MY_PERMISSIONS_REQUEST_SEND_SMS);
                }
                else
                {
                    SmsManager sms = SmsManager.getDefault();
                    sms.sendTextMessage(etTelNr, null,etmessage,null,null);
                }
            }
        });
    }
    public void startStop(){
        if (timeRunning)
        {
            stopTimer();
        }
        else{
            startTimer();
        }
    }
    public void startTimer()
    {
      countDownTimer = new CountDownTimer(timeLeftMillis, 1000) {
          @Override
          public void onTick(long l) {
              timeLeftMillis = l;
              updateTimer();
          }

          @Override
          public void onFinish() {

          }
      }.start();

      timeRunning = true;
    }
    public void stopTimer(){
        countDownTimer.cancel();
        timeRunning=false;
    }

    //Builds Timer
    public void updateTimer()
    {
        int minutes =(int) timeLeftMillis/60000;
        int secondes = (int) timeLeftMillis % 60000/ 1000;

        String timeLeftText;
        timeLeftText = "" + minutes;
        timeLeftText += ":";
        if(secondes < 10) timeLeftText +="0";
        timeLeftText += secondes;
        CountdownText.setText(timeLeftText);

    }
}
