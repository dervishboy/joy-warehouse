import Product from "../model/product.js";

const ProductController = {
    getProducts: async (req, res) => {
        try {
            const response = await Product.getAll();
            res.json(response);
        } catch (error) {
            console.error('Error in getProducts:', error);
            res.status(500).json({ error: error.message });
        }
    },
    getProductById: async (req, res) => {
        try {
            const product = await Product.getById(req.params.id);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    createProduct: async (req, res) => {
        try {
            const product = await Product.create(req.body);
            res.status(201).json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    updateProduct: async (req, res) => {
        try {
            const product = await Product.update(req.params.id, req.body);
            res.json(product);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deleteProduct: async (req, res) => {
        try {
            await Product.delete(req.params.id);
            res.send('Product deleted');
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
};

export default ProductController;