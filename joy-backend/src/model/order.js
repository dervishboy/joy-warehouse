import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Order = {
    getAll: async () => {
        try {
            return await prisma.order.findMany({
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
                        create: await Promise.all(products.map(async product => {
                            const createdProduct = await prisma.product.create({
                                data: {
                                    kode_produk: product.kode_produk,
                                    nama_produk: product.nama_produk,
                                    deskripsi: product.deskripsi,
                                    productMaterials: {
                                        create: product.productMaterials.map(material => ({
                                            material: { connect: { id: material.material_id } },
                                            quantity: material.quantity
                                        }))
                                    }
                                }
                            });
                            for (const material of product.productMaterials) {
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

                            return {
                                product_id: createdProduct.id
                            };
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
