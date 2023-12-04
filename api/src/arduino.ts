import dotenv from "dotenv";
import * as db from "./db";
import { createServer, Socket } from "net";

dotenv.config();

enum EventType {
    ValveOpen,
    ValveClose,
    SensorUpdate
};

let socket: Socket | undefined;

export const initArduinoListener = () => {
    const server = createServer((client: Socket) => {
        // Disconnect other client if connected (any client can kick any othe client off, solves reconnecting problem)
        socket?.destroy();

        console.log(`Established Connection with Client: ${client.remoteAddress}:${client.remotePort}`);
        client.on('data', handleData);

        socket = client;
    });

    server.listen(process.env.ARDUINO_SERVER_PORT);
}

const handleData = (data: Buffer) => {
    const s: string[] = data.toString().split(',');

    // device_id:event:data_point,...
    for (let i = 0; i < s.length; i++) {
        try {
            let [device_id, event_type, reading] = s[i].split(':').map(n => Number(n));
            console.log(device_id, event_type, reading);

            if (reading > 1000) // Bug fix
                reading = Math.floor(reading / 10);

            console.log("New: ", reading);

            db.query(
                "INSERT INTO history (device_id, event_type, reading, timestamp) VALUES ($1, $2, $3, $4);",
                [device_id, event_type, reading, new Date()]
            );
        } catch (err) {
            console.error("Failed to Record Reading: ", err);
        }
    }
}

export const openValve = (valve_id: number) => {
    if (socket === undefined)
        throw Error("Connection with Arduino Failed");

    socket.write(`O${valve_id}`);
}

export const closeValve = (valve_id: number) => {
    if (socket === undefined)
        throw Error("Connection with Arduino Failed");

    socket.write(`C${valve_id}`);
}

export const valveStatus = () => {

}