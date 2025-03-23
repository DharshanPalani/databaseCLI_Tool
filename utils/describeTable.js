import pool from "../database/db.js";
import ora from "ora";
import inquirer from "inquirer";
import logger from "./logger.js";

async function describeTable() {
    const client = await pool.connect();
    try {
        const { tableName } = await inquirer.prompt([
            {
                type: "input",
                name: "tableName",
                message: "Enter the table name to describe:",
            },
        ]);

        const spin = ora(`Describing table: ${tableName}`).start();
        const result = await client.query(`
            SELECT column_name, data_type 
            FROM information_schema.columns 
            WHERE table_name = $1;
        `, [tableName]);

        if (result.rows.length === 0) {
            spin.warn(`No information found for table '${tableName}'.`);
        } else {
            spin.succeed(`Table '${tableName}' structure:`);
            console.table(result.rows);
        }
    } catch (error) {
        logger.error(error.message);
    } finally {
        if (client) client.release();
    }
}

export default describeTable;
