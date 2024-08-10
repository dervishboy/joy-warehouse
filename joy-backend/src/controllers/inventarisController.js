import Inventaris from "../model/inventaris.js";

const InventarisController = {
    getInventaris: async (req, res) => {
        try {
            const searchQuery = req.query.searchQuery || '';
            const page = parseInt(req.query.page, 10) || 0;
            const rowsPerPage = parseInt(req.query.rowsPerPage, 10) || 10;

            const { inventaris, totalInventaris } = await Inventaris.getAll({
                searchQuery,
                page,
                rowsPerPage,
            });

            res.json({
                inventaris,
                totalInventaris,
                currentPage: page,
                rowsPerPage, 
            });
        } catch (error) {
            console.error('Error in getInventaris:', error);
            res.status(500).json({ error: error.message });
        }
    },
    createInventaris: async (req, res) => {
        const data = req.body;
        try {
            const response = await Inventaris.create(data);
            res.status(201).json(response);
        } catch (error) {
            console.error('Error in createInventaris:', error);
            res.status(500).json({ error: error.message });
        }
    },
    getInventarisById: async (req, res) => {
        const { id } = req.params;
        try {
            const response = await Inventaris.getById(id);
            if (!response) {
                return res.status(404).send('Inventaris not found');
            }
            res.json(response);
        } catch (error) {
            console.error('Error in getInventarisById:', error);
            res.status(500).json({ error: error.message });
        }
    },
    updateInventaris: async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const response = await Inventaris.update(id, data);
            res.json(response);
        } catch (error) {
            console.error('Error in updateInventaris:', error);
            res.status(500).json({ error: error.message });
        }
    },
    deleteInventaris: async (req, res) => {
        const { id } = req.params;
        try {
            const response = await Inventaris.delete(id);
            res.send('Inventaris deleted');
        } catch (error) {
            console.error('Error in deleteInventaris:', error);
            res.status(500).json({ error: error.message });
        }
    },
};

export default InventarisController;