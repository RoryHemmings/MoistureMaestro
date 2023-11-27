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
        if (socket !== undefined)
            return

        socket = client
        console.log(`Established Connection with Client: ${client.remoteAddress}:${client.remotePort}`);

        client.on('data', handleData);
        client.on('close', () => {
            console.log(`Disconnected from client`);
            socket = undefined;
        });
    });

    server.listen(process.env.ARDUINO_SERVER_PORT);
}

const handleData = (data: Buffer) => {
    const s: string[] = data.toString().split(',');
    console.log(s);
    return;

    // device_id:event:data_point,...
    for (let i = 1; i < s.length; i++) {
        try {
            const [device_id, event_type, reading] = s[i].split(':').map(n => Number(n));
            db.query(
                "INSERT INTO history (device_id, event_type, reading, timestamp) VALUES ($1, $2, $3, $4);",
                [device_id, event_type, reading, new Date()]
            );
        } catch (err) {
            console.error("Failed to Record Reading: ", err);
        }
    }
}

export const openValve = () => {
    if (socket === undefined)
        throw Error("Connection with Arduino Failed");

    socket.write("o");
}

export const closeValve = () => {
    if (socket === undefined)
        throw Error("Connection with Arduino Failed");

    socket.write("c");
}