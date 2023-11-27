#include <Arduino.h>
#include <WiFiNINA.h>

/* Contains secrets I don't want in the git repo */
#include "secrets.h"

/* Macros */
#ifndef LED_BUILTIN
#define LED_BUILTIN 13
#endif

#define LED_PIN LED_BUILTIN

#define SERVER_ADDRESS "172.20.10.2"
#define SERVER_PORT 3001

/* Constants */
const char SSID[] = SECRET_SSID;
const char PASS[] = SECRET_PASS;
const int DEBUG_INTERVAL = 5000; /* Interval at which to update board information (milliseconds) */
static const int SOLENOID_PINS[] = {11, 12};

/* Statics */
int status = WL_IDLE_STATUS; /* Radio Status */
int led_state = LOW;         /* LED State */

WiFiClient client;

void connect_to_server()
{
    if (client.connect(SERVER_ADDRESS, SERVER_PORT)) {
        Serial.println("connected to server");

        client.println("Hello From Arduino");
    }
}

void setup()
{
    Serial.begin(9600);
    while (!Serial)
        ; /* Wait until serial is set up */

    pinMode(LED_PIN, OUTPUT);

    /* Attempt to connect to wifi */
    while (status != WL_CONNECTED) {
        Serial.print("Attempting to connect to network: ");
        Serial.println(SSID);

        status = WiFi.begin(SSID, PASS);

        /* Wait 10 seconds while connection is established */
        delay(10000);
    }

    Serial.println("Connection Successful!");
    Serial.println("----------------------");

    connect_to_server();
}

void loop()
{

    // TODO get state machine working for connection led
    // if valve is closed and we recieve a request to water, execute that request, and queue other requests
    // continuously maintain socket connection between arduino and api
    // wait for data and respond accordingly
    // monitor stuff and send it to arduino when nessecary

    if (!client.available()) {
        Serial.println();
        Serial.println("disconnecting from server");

        client.stop();
        delay(1000);
        return;
    } else {
        client.write("0:2:3.14,1:2:1.234");
    }

    // while (client.available()) {
    //     char c = client.read();
    //     // switch (c) {
    //     // case 'O':
    //     // 	digitalWrite(LED_PIN, HIGH);
    //     // 	break;
    //     // case 'C':
    //     // 	digitalWrite(LED_PIN, LOW);
    //     // 	break;
    //     // }
    // }

    
}
