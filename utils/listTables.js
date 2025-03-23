import pool from "../database/db.js";
import ora from "ora";
import logger from "./logger.js";

async function listTables() {
    const spin = ora("Fetching table list...").start();
    try {
        const client = await pool.connect();
        const result = await client.query(`
            SELECT tablename 
            FROM pg_catalog.pg_tables 
            WHERE schemaname = 'public';
        `);
        client.release();

        if (result.rows.length === 0) {
            spin.warn("No tables found in the database.");
        } else {
            spin.succeed("Tables retrieved successfully:");
            console.table(result.rows);
        }
    } catch (error) {
        spin.fail("Failed to fetch tables.");
        logger.error(error.message);
    }
}

export default listTables;
