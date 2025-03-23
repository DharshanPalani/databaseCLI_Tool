import fs from "fs";

const RECENT_QUERIES_FILE = "./config/recent_queries.json";

function saveRecentQuery(query) {
    let recentQueries = [];
    if (fs.existsSync(RECENT_QUERIES_FILE)) {
        recentQueries = JSON.parse(fs.readFileSync(RECENT_QUERIES_FILE, "utf-8"));
    }
    recentQueries.unshift(query);
    if (recentQueries.length > 10) recentQueries.pop();
    fs.writeFileSync(RECENT_QUERIES_FILE, JSON.stringify(recentQueries, null, 2));
}

function showRecentQueries() {
    if (!fs.existsSync(RECENT_QUERIES_FILE)) {
        console.log("No recent queries found.");
        return;
    }
    const recentQueries = JSON.parse(fs.readFileSync(RECENT_QUERIES_FILE, "utf-8"));
    console.log("\nRecent Queries:\n");
    recentQueries.forEach((query, index) => console.log(`${index + 1}. ${query}`));
}

export default { saveRecentQuery, showRecentQueries };
