const OrderController = require("./controller");
const { sendJSON } = require("./utils");

function router(req, res) {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    const pathname = parsedUrl.pathname;
    const method = req.method;

    // para debbug:
    console.log(`DEBUG -> Path recebido: "${pathname}" | Método: "${method}"`);

    if (pathname === "/orders" && method === "GET") {
        return OrderController.getOrders(req, res, parsedUrl.searchParams);
    }

    if (pathname === "/orders" && method === "POST") {
        return OrderController.createOrder(req, res);
    }

    const idMatch = pathname.match(/^\/orders\/(\d+)$/);
    const statusMatch = pathname.match(/^\/orders\/(\d+)\/status$/);

    if (idMatch && method === "GET") {
        return OrderController.getOrderById(req, res, idMatch[1]);
    }

    if (idMatch && method === "DELETE") {
        return OrderController.deleteOrder(req, res, idMatch[1]);
    }

    if (statusMatch && method === "PATCH") {
        return OrderController.updateOrderStatus(req, res, statusMatch[1]);
    }

    sendJSON(res, 404, {
        message:
            "Endpoint não encontrado. Verifique a URL e o método HTTP utilizado",
    });
}

module.exports = router;
