import dotenv from "dotenv";
import { Pool } from "pg";

dotenv.config();

const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: parseInt(process.env.DB_PORT || "5432"),
});

export const initDB = async () => {
    try {
        await query(`
            CREATE TABLE IF NOT EXISTS "history" (
                "id" SERIAL,
                "device_id" INTEGER NOT NULL,
                "event_type" INTEGER NOT NULL,
                "reading" REAL NOT NULL,
                "timestamp" TIMESTAMPTZ NOT NULL,
                PRIMARY KEY ("id")
            );
            CREATE TABLE IF NOT EXISTS "plants" (
                "device_id" INTEGER NOT NULL,
                "plant_name" VARCHAR NOT NULL,
                "optimal_range_min" REAL NOT NULL,
                "optimal_range_max" REAL NOT NULL,
                "connected_valve" INTEGER NOT NULL,
                "image" VARCHAR NOT NULL,
                PRIMARY KEY ("device_id")
            ); 
        `);
        console.log("Successfully Initialized Table");
    } catch (err) {
        console.error("Failed to initalize table");
        console.log(err);
    }
};

export const query = (text: string, values?: any[]) => {
    return pool.query(text, values);
};