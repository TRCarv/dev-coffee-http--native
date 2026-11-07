function sendJSON(res, statusCode, data = null) {
    if (statusCode === 204) {
        res.writeHead(204);
        return res.end();
    }

    res.writeHead(statusCode, {
        "Content-Type": "application/json; charset=utf-8",
    });
    res.end(JSON.stringify(data));
}

function parseBody(req) {
    return new Promise((resolve, reject) => {
        let body = "";

        req.on("data", (chunk) => {
            body += chunk.toString();
        });

        req.on("end", () => {
            if (!body) return resolve(null);

            try {
                const parsed = JSON.parse(body);
                resolve(parsed);
            } catch (error) {
                resolve({ error: "JSON mal formado" });
            }
        });
    });
}

module.exports = { sendJSON, parseBody };
