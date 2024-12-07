var fs = require("fs");
var http = require("http");

var server = http.createServer((req, res) => {
    // Add CORS headers
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");


    if (req.method === "POST") {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk;
        });

        req.on("end", () => {
            let requestData;
            requestData = JSON.parse(body);


            let readData;

            readData = fs.readFileSync("db.json", "utf-8");
            readData = JSON.parse(readData);


            let responseData;

            if (requestData.value === "student") {
                responseData = readData.student;
            } 
            else if (requestData.value === "store") {
                responseData = readData.store;
            } 
            else {
                responseData = { error: "Invalid request or data not found" };
            }

            res.end(JSON.stringify(responseData));
        });
    } else {

        res.end(JSON.stringify({ error: "Route not found" }));
    }
});

server.listen(3002, () => {
    console.log("Server running on port 3002");
});
