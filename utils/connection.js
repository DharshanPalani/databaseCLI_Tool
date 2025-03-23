import pool from "../database/db.js";
import ora from "ora";
import logger from "./logger.js";

async function testDBConnection() {
    const spin = ora("Testing database connection...").start();
    try {
        const dbClient = await pool.connect();
        dbClient.release();
        spin.succeed("Database connection successful!");
        logger.success("Connected to PostgreSQL");
    } catch (err) {
        spin.fail("Database connection failed!");
        logger.error(err.message);
    }
}

export default testDBConnection;
