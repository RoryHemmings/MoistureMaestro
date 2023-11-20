#include <Arduino.h>
#include <WiFiNINA.h>

/* Contains secrets I don't want in the git repo */
#include "secrets.h"

// /* Macros */
#ifndef LED_BUILTIN
#define LED_BUILTIN 13
#endif

#define LED_PIN LED_BUILTIN

// /* Constants */
const char SSID[] = SECRET_SSID;
const char PASS[] = SECRET_PASS;
const int SOLENOID_PINS[] = { 11, 12 };
// const int DEBUG_INTERVAL = 5000; /* Interval at which to update board information (milliseconds) */

// /* Statics */
int status = WL_IDLE_STATUS;            /* Radio Status */
int led_state = LOW;                    /* LED State */
unsigned long previous_millis_info = 0; /* Last time WI-FI info was updated */
unsigned long previous_millis_led = 0;  /* Last time LED was update */

void setup()
{
    // Serial.begin(9600);
    // while (!Serial)
    //     ; /* Wait until serial is set up */

    pinMode(13, OUTPUT);
    pinMode(SOLENOID_PINS[0], OUTPUT);
    pinMode(SOLENOID_PINS[1], OUTPUT);

    // /* Attempt to connect to wifi */
    // while (status != WL_CONNECTED) {
    //     Serial.print("Attempting to connect to network: ");
    //     Serial.println(SSID);

    //     status = WiFi.begin(SSID, PASS);

    //     /* Wait 10 seconds while connection is established */
    //     delay(10000);
    // }

    // Serial.println("Connection Successful!");
    // Serial.println("----------------------");
}

void loop()
{
    digitalWrite(SOLENOID_PINS[0], HIGH);
    digitalWrite(13, HIGH);
    delay(1000);
    digitalWrite(SOLENOID_PINS[0], LOW);
    digitalWrite(13, LOW);
    delay(1000);

    // /* Milliseconds since runtime */
    // unsigned long current_millis_info = millis();

    // /* Print out debug information if we've reached that interval */
    // if (current_millis_info - previous_millis_info >= DEBUG_INTERVAL) {
    //     Serial.println("Board Information: ");

    //     /* Local IP */
    //     IPAddress ip = WiFi.localIP();
    //     Serial.print("IP Address: ");
    //     Serial.println(ip);

    //     Serial.println();
    //     Serial.print("Network Information: ");

    //     /* Network SSID */
    //     Serial.print("Network SSID: ");
    //     Serial.println(WiFi.SSID());

    //     Serial.print("Signal Strength (RSSI): ");
    //     Serial.println(WiFi.RSSI());
    //     Serial.println("---------------------------");

    //     previous_millis_info = current_millis_info;
    // }

    // /* Flash faster based on how strong signal is */
    // unsigned long current_millis_led = millis();
    // int led_interval = WiFi.RSSI() * -10;
    // if (current_millis_led - previous_millis_led >= led_interval) {
    //     if (led_state == LOW)
    //         led_state = HIGH;
    //     else
    //         led_state = LOW;

    //     digitalWrite(LED_PIN, led_state);
    //     previous_millis_led = current_millis_info;
    // }
}
