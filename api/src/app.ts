import bodyParser from "body-parser";
import dotenv from "dotenv";
import express, { NextFunction, Request, Response } from "express";
import * as db from "./db";
import { initArduinoListener, openValve, closeValve } from "./arduino";
import { generateMoistureTestData, generatePlantTestData } from "./actions";

const app = express();
dotenv.config(); // Read env variables from .env file

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// Set up Database Tables
db.initDB();

// Set up server to communicate with arduino
initArduinoListener();

app.get("/", (req: Request, res: Response, next: NextFunction) => {
    res.send("Hello World");
});

//Change to another http verb
app.get("/seed", (req: Request, res: Response, next: NextFunction) => {
    generateMoistureTestData(); 
    generatePlantTestData(); 
    res.status(200); 
    res.send("Successfully seeded database");
})

//Change to another http verb
app.get("/clear", async (req: Request, res: Response, next: NextFunction) => {
    try {
        await db.query("TRUNCATE history;");
        await db.query("TRUNCATE plants;"); 
    } catch (err) {
        res.status(500).send("Failed to read from database");
    }
})

app.get("/all", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await db.query("SELECT * FROM history;");
        res.status(200).json(data.rows);
    } catch (err) {
        res.status(500).send("Failed to read from database");
    }
});

app.get("/device/:device_id", async (req: Request, res: Response, next: NextFunction) => {
    let device_id = parseInt(req.params.device_id); 
    try {
        const data = await db.query("SELECT * FROM history WHERE device_id = $1 AND timestamp BETWEEN current_date and current_date + interval '7 days' ORDER BY timestamp;", [device_id]);
        res.status(200).json(data.rows);
    } catch (err) {
        res.status(500).send(`Failed to read from database: ${err}`);
    }
});

app.get("/plants", async (req: Request, res: Response, next: NextFunction) => {
    try {
        const data = await db.query("SELECT * FROM plants");
        res.status(200).json(data.rows);
    } catch (err) {
        res.status(500).send(`Failed to read from database: ${err}`);
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