import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import * as db from "./db";
import { generateMoistureTestData } from "./util";
import { initArduinoListener, openValve, closeValve } from "./arduino";

const app = express();
dotenv.config(); // Read env variables from .env file

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Set up Database Tables
db.initDB();
// if (test) {
//     generateMoistureTestData();
// }

// Set up server to communicate with arduino
initArduinoListener();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World");
});

app.get("/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await db.query("SELECT * FROM history;");
        res.status(200).json(data.rows);
    } catch (err) {
        res.status(500).send("Failed to read from database");
    }
});

// Return the status of each valve
app.get("/status", async (req: Request, res: Response, next: NextFunction) => {
    try {
        throw Error("Not implemented yet");
        // const ret = await valveStatus();
        // res.status(200).json(ret);
    } catch (err) {
        res.status(500).send("Failed to get valve status"); 
    }
});

app.post("/new", async (req: Request, res: Response, next: NextFunction) => {
    const body = req.body;
    try {
        await db.query(
            "INSERT INTO history (device_id, event_type, reading, timestamp) VALUES ($1, $2, $3, $4);",
            [body.device_id, body.event, body.reading, new Date()]
        );
        res.send("Success");
    } catch (err) {
        console.log(err);
        res.status(500).send("Failed to insert");
    }
});

app.post("/open", async (req: Request, res: Response, next: NextFunction) => {
    try {
        openValve(req.body.valve_id);
        res.status(200).send();
    } catch (err) {
        res.status(500).send("Failed to open valve");
    }
});

app.post("/close", async (req: Request, res: Response, next: NextFunction) => {
    try {
        closeValve(req.body.valve_id);
        res.status(200).send();
    } catch (err) {
        res.status(500).send("Failed to close valve");
    }
});

app.get("*", (req: Request, res: Response) => {
    return res.status(404).send("404 Not Found");
});

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
});