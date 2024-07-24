import Order from '../model/order.js';

const OrderController = {
    getOrders: async (req, res) => {
        try {
            const response = await Order.getAll();
            res.json(response);
        } catch (error) {
            console.error('Error in getOrders:', error);
            res.status(500).json({ error: error.message });
        }
    },
    getOrderById: async (req, res) => {
        try {
            const order = await Order.getById(req.params.id);
            res.json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createOrder: async (req, res) => {
        try {
            const order = await Order.create(req.body);
            res.status(201).json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateOrder: async (req, res) => {
        try {
            const order = await Order.update(req.params.id, req.body);
            res.json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteOrder: async (req, res) => {
        try {
            await Order.delete(req.params.id);
            res.send('Order deleted');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default OrderController;
