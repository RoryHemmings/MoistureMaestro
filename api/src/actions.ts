import * as db from "./db";

export async function insertMoistureReading(device_id: number, event_type: event, reading: number, date: Date) {
    try {
        await db.query(
            "INSERT INTO history (device_id, event_type, reading, timestamp) VALUES ($1, $2, $3, $4);", 
            [device_id, 0, reading, new Date()]
        );
    }
    catch (err) {
        throw err; 
    }
}