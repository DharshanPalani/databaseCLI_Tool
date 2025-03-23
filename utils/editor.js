import fs from "fs";
import os from "os";
import path from "path";
import { spawn } from "child_process";
import chalk from "chalk";

const CONFIG_FILE_PATH = "./config/config.json";

function getPreferredEditor() {
    if (fs.existsSync(CONFIG_FILE_PATH)) {
        const config = JSON.parse(fs.readFileSync(CONFIG_FILE_PATH, "utf-8"));
        return config.defaultEditor || "vim";
    }
    return "vim";
}

async function getQueryFromEditor() {
    return new Promise((resolve, reject) => {
        const tempFilePath = path.join(os.tmpdir(), `pg_query_${Date.now()}.sql`);
        fs.writeFileSync(tempFilePath, "-- Write your database query here\n");

        const editor = getPreferredEditor();
        console.log(chalk.cyan(`\nOpening ${editor}...`));

        const editorProcess = spawn(editor, [tempFilePath], { stdio: "inherit" });

        editorProcess.on("exit", () => {
            const sqlQuery = fs.readFileSync(tempFilePath, "utf-8").trim();
            fs.unlinkSync(tempFilePath);
            resolve(sqlQuery);
        });

        editorProcess.on("error", (error) => {
            reject(error);
        });
    });
}

export default { getPreferredEditor, getQueryFromEditor };
