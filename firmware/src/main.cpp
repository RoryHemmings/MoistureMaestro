#include <Arduino.h>
#include <WiFiNINA.h>

#include "sensor.h"
#include "valve.h"

/* Contains secrets I don't want in the git repo */
#include "secrets.h"

/* Macros */
#ifndef LED_BUILTIN
#define LED_BUILTIN 13
#endif

#define LED_PIN LED_BUILTIN

/* Constants */
const char SSID[] = SECRET_SSID;
const char PASS[] = SECRET_PASS;
const int DEBUG_INTERVAL = 5000; /* Interval at which to update board information (milliseconds) */

// Upload data every 2 seconds
const int UPLOAD_INTERVAL = 2000;
unsigned long last_upload_time = 0;

/* Statics */
int status = WL_IDLE_STATUS; /* Radio Status */
int led_state = LOW;         /* LED State */

WiFiClient client;

void connect_to_server()
{
    if (client.connect(SERVER_ADDRESS, SERVER_PORT))
        Serial.println("Established connection with server");
    else
        delay(1000);
}

void setup()
{
    Serial.begin(9600);

    while (!Serial)
        ; /* Wait until serial is set up */

    pinMode(LED_PIN, OUTPUT);
    initValves();

    /* Attempt to connect to wifi */
    while (status != WL_CONNECTED) {
        Serial.print("Attempting to connect to network: ");
        Serial.println(SSID);

        status = WiFi.begin(SSID, PASS);

        /* Wait 1 second while connection is established */
        delay(1000);
    }

    Serial.println("Network Connection Successful!");

    connect_to_server();
}

void loop()
{
    unsigned long current_time = millis();

    if (client.status() == 0) {
        Serial.println("Connection with server failed, reconnecting");

        client.stop();
        connect_to_server();
        return;
    }

    // Upload sensor data at specified interval
    if (current_time - last_upload_time > UPLOAD_INTERVAL) {
        static char buf[128];
        snprintf(buf, sizeof(buf),
            "2:2:%d,3:2:%d,4:2:%d",
            (int) readSensor(2),
            (int) readSensor(3),
            (int) readSensor(4));
        
        client.write(buf);
        last_upload_time = current_time;
    }

    // Read all incoming data
    while (client.available()) {
        char c = client.read();
        int device_id;
        switch (c) {
        case 'O':
            device_id = client.read() - '0';
            openValve(device_id);
        	break;
        case 'C':
            device_id = client.read() - '0';
            closeValve(device_id);
        	break;
        case 'S':
            // Generate and return report about state of valves
            char buf[128];
            memset(buf, '\0', sizeof(buf));
            snprintf(buf, sizeof(buf) - 1, "0:%B,1:%B", valveStatus(0), valveStatus(1));
            client.write(buf);
            break;
        }
    }

    delay(100);
}
