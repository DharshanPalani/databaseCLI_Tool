import inquirer from "inquirer";
import chalk from "chalk";
import readlineSync from "readline-sync";
import clearScreen from "./utils/clearScreen.js";
import listTables from "./utils/listTables.js";
import describeTable from "./utils/describeTable.js";
import testDBConnection from "./utils/connection.js";
import executeSQLQuery from "./utils/queries.js";
import storage from "./utils/storage.js";
import editor from "./utils/editor.js";

async function showMainMenu() {
    while (true) {
        // clearScreen();
        console.log(chalk.blue.bold("\nDatabase CLI Tool - Main Menu\n"));
        const { selectedOption } = await inquirer.prompt([
            {
                type: "list",
                name: "selectedOption",
                message: "Choose an option:",
                choices: [
                    "Test Connection",
                    "List Tables",
                    "Describe Table",
                    "Show Recent Queries",
                    "Run Query (Inline)",
                    "Run Query (Editor)",
                    "Exit"
                ],
            }
        ]);

        if (selectedOption === "Exit") {
            console.log(chalk.green("\nGoodbye!\n"));
            process.exit(0);
        }
        // clearScreen();
        switch (selectedOption) {
            case "Test Connection":
                await testDBConnection();
                break;
            case "List Tables":
                await listTables();
                break;
            case "Describe Table":
                await describeTable();
                break;
            case "Show Recent Queries":
                storage.showRecentQueries();
                break;
            case "Run Query (Inline)":
                while (true) {
                    const sqlQuery = readlineSync.question(chalk.yellow("\nEnter SQL query (or type 'exit' to return to menu): "));
                    if (sqlQuery.toLowerCase() === "exit") break;
                    await executeSQLQuery(sqlQuery);
                }
                break;
            case "Run Query (Editor)":
                const sqlQuery = await editor.getQueryFromEditor();
                if (sqlQuery) await executeSQLQuery(sqlQuery);
                break;
        }
    }
}
// clearScreen();
showMainMenu();
