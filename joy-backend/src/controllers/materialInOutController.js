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

    getAllMovement: async (req, res) => {
        try {
            const searchQuery = req.query.type || '';
            const response = await MaterialMovement.getAll({ searchQuery });
            res.json(response);
        } catch (error) {
            console.error('Error in getAllMovement:', error);
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