import Material from "../model/material.js";

const MaterialController = {
    getMaterials: async (req, res) => {
        try {
            const searchQuery = req.query.nama_material || '';
            const response = await Material.getAll({searchQuery});
            res.json(response);
        } catch (error) {
            console.error('Error in getMaterials:', error);
            res.status(500).json({ error: error.message });
        }
    },

    createMaterial: async (req, res) => {
        const data = req.body;
        try {
            const response = await Material.create(data);
            res.status(201).json(response);
        } catch (error) {
            console.error('Error in createMaterial:', error);
            res.status(500).json({ error: error.message });
        }
    },

    getMaterialById: async (req, res) => {
        const { id } = req.params;
        try {
            const response = await Material.getById(id);
            if (!response) {
                return res.status(404).send('Material not found');
            }
            res.json(response);
        } catch (error) {
            console.error('Error in getMaterialById:', error);
            res.status(500).json({ error: error.message });
        }
    },

    updateMaterial: async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const response = await Material.update(id, data);
            res.json(response);
        } catch (error) {
            console.error('Error in updateMaterial:', error);
            res.status(500).json({ error: error.message });
        }
    },

    deleteMaterial: async (req, res) => {
        const { id } = req.params;
        try {
            const response = await Material.delete(id);
            res.send('Material deleted');
        } catch (error) {
            console.error('Error in deleteMaterial:', error);
            res.status(500).json({ error: error.message });
        }
    },
};

export default MaterialController;