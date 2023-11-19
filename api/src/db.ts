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
                "event" INTEGER NOT NULL,
                "reading" INTEGER NOT NULL,
                "timestamp" TIMESTAMPTZ NOT NULL,
                PRIMARY KEY ("id")
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