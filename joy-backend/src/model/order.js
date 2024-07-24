import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Order = {
    getAll: async () => {
        try {
            return await prisma.order.findMany({
                include: {
                    orderProducts: {
                        include: {
                            product: true
                        }
                    }
                }
            });
        } catch (error) {
            throw new Error(`Failed to get orders: ${error.message}`);
        }
    },

    getById: async (id) => {
        try {
            return await prisma.order.findUnique({
                where: { id: parseInt(id) },
                include: {
                    orderProducts: {
                        include: {
                            product: true
                        }
                    }
                }
            });
        } catch (error) {
            throw new Error(`Failed to get order: ${error.message}`);
        }
    },

    create: async (data) => {
        const { nama_pemesan, kode_pesanan, estimatedTime, products } = data;

        try {
            const createdOrder = await prisma.order.create({
                data: {
                    nama_pemesan,
                    kode_pesanan,
                    estimatedTime: new Date(estimatedTime),
                    orderProducts: {
                        create: products.map(product => ({
                            product: {
                                create: {
                                    kode_produk: product.kode_produk,
                                    nama_produk: product.nama_produk,
                                    deskripsi: product.deskripsi,
                                    productMaterials: {
                                        create: product.materials.map(material => ({
                                            material: { connect: { nama_material: material.nama_material } },
                                            quantity: parseInt(material.quantity)
                                        }))
                                    }
                                }
                            },
                            quantity: 1
                        }))
                    }
                },
                include: {
                    orderProducts: {
                        include: {
                            product: {
                                include: {
                                    productMaterials: {
                                        include: {
                                            material: true
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });

            for (const product of products) {
                for (const material of product.materials) {
                    const existingMaterial = await prisma.material.findUnique({
                        where: { nama_material: material.nama_material }
                    });

                    if (existingMaterial) {
                        await prisma.material.update({
                            where: { nama_material: material.nama_material },
                            data: {
                                quantity: {
                                    decrement: parseInt(material.quantity)
                                }
                            }
                        });
                        await prisma.materialMovement.create({
                            data: {
                                material_id: existingMaterial.id,
                                quantity: parseInt(material.quantity),
                                type: "KELUAR"
                            }
                        });
                    } else {
                        throw new Error(`Material ${material.nama_material} does not exist.`);
                    }
                }
            }

            return createdOrder;
        } catch (error) {
            console.error(`Failed to create order: ${error.message}`);
            throw new Error(`Failed to create order: ${error.message}`);
        }
    },

    update: async (id, data) => {
        try {
            return await prisma.order.update({
                where: { id: parseInt(id) },
                data,
            });
        } catch (error) {
            throw new Error(`Failed to update order: ${error.message}`);
        }
    },

    delete: async (id) => {
        try {
            return await prisma.order.delete({
                where: { id: parseInt(id) },
            });
        } catch (error) {
            throw new Error(`Failed to delete order: ${error.message}`);
        }
    },
};

export default Order;
