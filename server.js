const http = require("http");
const router = require("./src/router");

const PORT = 3000;

const server = http.createServer((req, res) => {
    router(req, res);
});

server.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
