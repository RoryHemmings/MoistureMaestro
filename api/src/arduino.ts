import dotenv from "dotenv";
import { createServer, Socket } from "net";

dotenv.config();

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
    console.log(data.toString());
}

export const openValve = () => {
    if (socket === undefined)
        throw Error("Connection with Arduino Failed");

    socket.write("O");
}

export const closeValve = () => {
    if (socket === undefined)
        throw Error("Connection with Arduino Failed");

    socket.write("C");
}