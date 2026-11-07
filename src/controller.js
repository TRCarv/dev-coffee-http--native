const OrderModel = require("./model");
const { sendJSON, parseBody } = require("./utils");

const OrderController = {
    async getOrders(req, res, queryParams) {
        const statusFilter = queryParams.get("status");
        const orders = OrderModel.findAll(statusFilter);
        sendJSON(res, 200, orders);
    },

    async getOrderById(req, res, id) {
        const order = OrderModel.findById(Number(id));
        if (!order) {
            return sendJSON(res, 404, { message: "Pedido não encontrado" });
        }
        sendJSON(res, 200, order);
    },

    async createOrder(req, res) {
        const body = await parseBody(req);

        if (!body || body.error || !body.client || !body.item) {
            return sendJSON(res, 400, {
                message:
                    "Requisição inválida. Verifique os campos client e item. Eles são obrigatórios ",
            });
        }

        const newOrder = OrderModel.create(body.client, body.item);
        sendJSON(res, 201, newOrder);
    },

    async updateOrderStatus(req, res, id) {
        const body = await parseBody(req);

        if (!body || body.error || !body.status) {
            return sendJSON(res, 400, {
                message: "Corpo inválido ou campo status faltando",
            });
        }

        const result = OrderModel.updateStatus(Number(id), body.status);

        if (result.error === "invalid_status") {
            return sendJSON(res, 400, {
                message: "Status inválido. Use: pendente, pronto ou cancelado.",
            });
        }

        if (result.error === "not_found") {
            return sendJSON(res, 404, { message: "Pedido não encontrado" });
        }
        sendJSON(res, 200, result);
    },

    async deleteOrder(req, res, id) {
        const success = OrderModel.delete(Number(id));
        if (!success) {
            return sendJSON(res, 404, { message: "Pedido não encontrado" });
        }
        sendJSON(res, 204);
    },
};

module.exports = OrderController;
