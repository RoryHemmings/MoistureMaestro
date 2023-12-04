#include <Arduino.h>
#include "sensor.h"

const int NUM_SENSORS = 3;

static const int DEVICE_ID_OFFSET = 2;
static const int NUM_SAMPLES = 5;
static const int SENSOR_PINS[] = {
    14, 15, 16
};

double readSensor(int device_id)
{
    if (device_id < DEVICE_ID_OFFSET || \
        device_id >= DEVICE_ID_OFFSET + NUM_SENSORS)
        return -1.0;

    double sum = 0.0;
    for (int i = 0; i < NUM_SAMPLES; i++) {
        int pin = SENSOR_PINS[device_id - DEVICE_ID_OFFSET];
        sum += analogRead(pin);
    }

    /* Average of 5 samples */
    return (sum / NUM_SAMPLES);
}
