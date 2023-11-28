#include <Arduino.h>

#include "valve.h"

/**
 * Each Device has an id:
 * 
 * Valve1: 0
 * Valve2: 1
 * Sensors: 2 to n (where n is number of devices - 1)
 */

static Valve valves[2] = {
    { 0, 11, Closed },
    { 1, 12, Closed }
};

void openValve(int valve_id) {
    if (valve_id < 0 || valve_id > 1)
        return;

    struct Valve *v = &valves[valve_id];

    digitalWrite(v->pin, HIGH);
    v->status = Open;
}

void closeValve(int valve_id) {
    if (valve_id < 0 || valve_id > 1)
        return;

    struct Valve *v = &valves[valve_id];

    digitalWrite(v->pin, LOW);
    v->status = Closed;
}

ValveState valveStatus(int valve_id)
{
    return valves[valve_id].status;
}