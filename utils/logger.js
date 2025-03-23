import chalk from "chalk";

const logger = {
    success: (message) => console.log(chalk.green(`✔ ${message}`)),
    error: (message) => console.log(chalk.red(`✖ ${message}`)),
    info: (message) => console.log(chalk.blue(`ℹ ${message}`)),
};

export default logger;
