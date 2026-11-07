let orders = [];
let currentId = 1;

const VALID_STATUSES = ["pendente", "pronto", "cancelado"];

const OrderModel = {
    findAll: (statusFilter) => {
        if (statusFilter) {
            return orders.filter((o) => o.status === statusFilter);
        }
        return orders;
    },

    findById: (id) => {
        return orders.find((o) => o.id === id);
    },

    create: (client, item) => {
        const newOrder = {
            id: currentId++,
            client,
            item,
            status: "pendente",
        };
        orders.push(newOrder);
        return newOrder;
    },

    updateStatus: (id, newStatus) => {
        if (!VALID_STATUSES.includes(newStatus))
            return { error: "invalid_status" };

        const order = orders.find((o) => o.id === id);
        if (!order) return { error: "not_found" };

        order.status = newStatus;
        return order;
    },

    delete: (id) => {
        const initialLength = orders.length;
        orders = orders.filter((o) => o.id !== id);
        return orders.length < initialLength; // se deletou algo, retorna True
    },
};
module.exports = OrderModel;
