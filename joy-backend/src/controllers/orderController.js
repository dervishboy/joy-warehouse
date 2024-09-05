import Order from '../model/order.js';

const OrderController = {
    getOrders: async (req, res) => {
        try {
            const searchQuery = req.query.searchQuery || '';
            const page = parseInt(req.query.page, 10) || 0;
            const rowsPerPage = parseInt(req.query.rowsPerPage, 10) || 10;

            const { orders, totalOrders } = await Order.getAll({
                searchQuery,
                page,
                rowsPerPage,
            });

            res.json({
                orders,
                totalOrders,
                currentPage: page,
                rowsPerPage,
            });

            
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
    updateStatus: async (req, res) => {
        try {
            const order = await Order.updateStatus(req.params.id, req.body.status);
            res.json(order);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },

    generateNextKode: async (req, res) => {
        try {
            const { prefix, model, kodeField } = req.query;
            const nextKode = await Order.generateNextKode(prefix, model, kodeField);
            res.json({ nextKode });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default OrderController;
