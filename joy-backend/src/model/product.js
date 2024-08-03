import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Product = {
    getAll: async () => {
        try {
            return await prisma.product.findMany({
                include: {
                    productMaterials: {
                        include: {
                            material: true
                        }
                    }
                }
            });
        } catch (error) {
            throw new Error(`Failed to get products: ${error.message}`);
        }
    },
    getById: async (id) => {
        try {
            return await prisma.product.findUnique({
                where: { id: parseInt(id) },
                include: {
                    productMaterials: {
                        include: {
                            material: true
                        }
                    }
                }
            });
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