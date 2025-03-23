import pool from "../database/db.js";
import ora from "ora";
import logger from "./logger.js";
import storage from "./storage.js";

async function executeSQLQuery(sqlQuery) {
    const loadingSpinner = ora("Executing database query...").start();
    try {
        const dbClient = await pool.connect();
        const queryResult = await dbClient.query(sqlQuery);
        dbClient.release();
        loadingSpinner.succeed("Query executed successfully!");
        console.table(queryResult.rows);
        storage.saveRecentQuery(sqlQuery);
    } catch (err) {
        loadingSpinner.fail("Query execution failed!");
        logger.error(err.message);
    }
}

export default executeSQLQuery;
