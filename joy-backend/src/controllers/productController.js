import Product from "../model/product.js";

const ProductController = {
    getProducts: async (req, res) => {
        try {
            const searchQuery = req.query.searchQuery || '';
            const page = parseInt(req.query.page, 10) || 0;
            const rowsPerPage = parseInt(req.query.rowsPerPage, 10) || 10;

            const { products, totalProducts } = await Product.getAll({
                searchQuery,
                page,
                rowsPerPage,
            });

            res.json({
                products,
                totalProducts,
                currentPage: page,
                rowsPerPage,
            });

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