#ifndef VALVE_H
#define VALVE_H

enum ValveState {
    Closed,
    Open
};

struct Valve {
    int valve_id;
    int pin;
    ValveState status;
};

void openValve(int valve_id);
void closeValve(int valve_id);
ValveState valveStatus(int valve_id);

#endif