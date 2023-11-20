#include <Arduino.h>
#include <WiFiNINA.h>

/* Contains secrets I don't want in the git repo */
#include "secrets.h"

/* Macros */
#ifndef LED_BUILTIN
#define LED_BUILTIN 13
#endif

#define LED_PIN LED_BUILTIN

#define SERVER_ADDRESS ""
#define SERVER_PORT 3001

/* Constants */
const char SSID[] = SECRET_SSID;
const char PASS[] = SECRET_PASS;
const int DEBUG_INTERVAL = 5000; /* Interval at which to update board information (milliseconds) */
static const SOLENOID_PINS[] = { 11, 12 };

/* Statics */
int status = WL_IDLE_STATUS;            /* Radio Status */
int led_state = LOW;                    /* LED State */

WiFiClient client;

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

	if (client.connect(SERVER_ADDRESS, SERVER_PORT)) {
		Serial.println("connected to server");

		Client.println("Hello From Arduino");
	}
}

void loop()
{

	// TODO get state machine working for connection led
	// if valve is closed and we recieve a request to water, execute that request, and queue other requests
	// continuously maintain socket connection between arduino and api
	// wait for data and respond accordingly
	// monitor stuff and send it to arduino when nessecary

	// Handle Connection
	// switch (client.status()) {
	// case /* Connected */:
	// 	// read if anything available
	// 	break;
	// case /* Disconnected */:
	// 	// attempt to reconnect
	// 	while (!client.connect(server, 80))
	// 		;
	// 	break;
	// }

	while (client.available()) {
		char c = client.read();
		// switch (c) {
		// case 'O':
		// 	digitalWrite(LED_PIN, HIGH);
		// 	break;
		// case 'C':
		// 	digitalWrite(LED_PIN, LOW);
		// 	break;
		// }

		Serial.write(c);
	}

	if (!client.available()) {
		Serial.println();
		Serial.println("disconnecting from server");

		client.stop();

		while (true);
	}
}
