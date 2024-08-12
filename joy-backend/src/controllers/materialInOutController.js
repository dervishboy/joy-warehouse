import MaterialMovement from "../model/materialInOut.js";

const MaterialInOutController = {
    materialIn: async (req, res) => {
        const data = req.body;
        try {
            const response = await MaterialMovement.createIn(data);
            res.status(201).json(response);
        } catch (error) {
            console.error('Error in materialIn:', error);
            res.status(500).json({ error: error.message });
        }
    },

    materialOut: async (req, res) => {
        const data = req.body;
        try {
            const response = await MaterialMovement.createOut(data);
            res.status(201).json(response);
        } catch (error) {
            console.error('Error in materialOut:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getAllMaterialIn: async (req, res) => {
        try {
            const searchQuery = req.query.searchQuery || '';
            const month = req.query.month || '';
            const page = parseInt(req.query.page, 10) || 0;
            const rowsPerPage = parseInt(req.query.rowsPerPage, 10) || 10;

            const { materialsMasuk, totalMasuk } = await MaterialMovement.getAllMasuk({
                searchQuery,
                month,
                page,
                rowsPerPage,
            });
            res.json({
                materialsMasuk,
                totalMasuk,
                currentPage: page,
                rowsPerPage,
            });

        } catch (error) {
            console.error('Error in getAllMaterialIn:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getAllMaterialOut: async (req, res) => {
        try {
            const searchQuery = req.query.searchQuery || '';
            const month = req.query.month || '';
            const page = parseInt(req.query.page, 10) || 0;
            const rowsPerPage = parseInt(req.query.rowsPerPage, 10) || 10;

            const { materialsKeluar, totalKeluar } = await MaterialMovement.getAllKeluar({
                searchQuery,
                month,
                page,
                rowsPerPage,
            });
            res.json({
                materialsKeluar,
                totalKeluar,
                currentPage: page,
                rowsPerPage,
            });
        } catch (error) {
            console.error('Error in getAllMaterialOut:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getMaterialMovementById: async (req, res) => {
        const { id } = req.params;
        try {
            const response = await MaterialMovement.getById(id);
            if (!response) {
                return res.status(404).send('Material Movement not found');
            }
            res.json(response);
        } catch (error) {
            console.error('Error in getMaterialMovementById:', error);
            res.status(500).json({ error: error.message });
        }
    },
};

export default MaterialInOutController;