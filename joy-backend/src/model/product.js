import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Product = {
    getAll: async ({searchQuery, page, rowsPerPage}) => {
        try {
            const whereClause = searchQuery ? {
                OR: [
                    { kode_produk: { contains: searchQuery } },
                    { nama_produk: { contains: searchQuery } },
                ],
            } : {};
            

            const totalProducts = await prisma.product.count({
                where: whereClause,
            });

            const products = await prisma.product.findMany({
                where: whereClause,
                skip: page * rowsPerPage,
                take: rowsPerPage,
                orderBy: {
                    id: 'desc',
                },
                include: {
                    productMaterials: {
                        include: {
                            material: true
                        }
                    }
                }
            });
            return { products, totalProducts };
        } catch (error) {
            throw new Error(`Failed to get products: ${error.message}`);
        }
    },
    getById: async (id) => {
        try {
            const product = await prisma.product.findUnique({
                where: { id: parseInt(id) },
                include: {
                    productMaterials: {
                        include: {
                            material: true
                        }
                    }
                }
            });
            return product;
        } catch (error) {
            throw new Error(`Failed to get product: ${error.message}`);
        }
    },
    update: async (id, data) => {
        try {
            const updatedProduct = await prisma.product.update({
                where: { id: parseInt(id) },
                data: {
                    ...data,
                },
            });
            return updatedProduct;
        } catch (error) {
            return error;
        }
    },
    delete: async (id) => {
        try {
            const deletedProduct = await prisma.product.delete({
                where: { id: parseInt(id) },
            });
            return deletedProduct;
        } catch (error) {
            return error;
        }
    },
};

export default Product;