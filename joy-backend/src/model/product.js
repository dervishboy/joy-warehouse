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
    create: async (data) => {
        const { kode_produk, nama_produk, deskripsi, materials } = data;

        try {
            const createdProduct = await prisma.product.create({
                data: {
                    kode_produk,
                    nama_produk,
                    deskripsi,
                    productMaterials: {
                        create: materials.map(material => ({
                            material: { connect: { id: material.material_id } },
                            quantity: material.quantity
                        }))
                    }
                }
            });
            for (const material of materials) {
                await prisma.material.update({
                    where: { id: material.material_id },
                    data: {
                        quantity: {
                            decrement: material.quantity
                        }
                    }
                });
                await prisma.materialMovement.create({
                    data: {
                        material_id: material.material_id,
                        quantity: material.quantity,
                        type: 'KELUAR'
                    }
                });
            }

            return createdProduct;
        } catch (error) {
            throw new Error(`Failed to create product: ${error.message}`);
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