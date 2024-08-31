import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const Order = {
    getAll: async ({ searchQuery, page, rowsPerPage }) => {
        try {
            const whereClause = searchQuery
                ? {
                    nama_pemesan: {
                        contains: searchQuery,
                    },
                }
                : {};

            const totalOrders = await prisma.order.count({
                where: whereClause,
            });

            const orders = await prisma.order.findMany({
                where: whereClause,
                skip: page * rowsPerPage,
                take: rowsPerPage,
                include: {
                    orderProducts: {
                        include: {
                            product: {
                                include: {
                                    productMaterials: {
                                        include: {
                                            material: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            });

            return { orders, totalOrders };
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
        const { nama_pemesan, kode_pesanan, estimatedTime, products, totalHarga } = data;

        try {
            const existingOrder = await prisma.order.findUnique({
                where: { kode_pesanan }
            });

            if (existingOrder) {
                throw new Error('Order with this kode_pesanan already exists.');
            }

            const createdOrder = await prisma.$transaction(async (prisma) => {
                const newOrder = await prisma.order.create({
                    data: {
                        nama_pemesan,
                        kode_pesanan,
                        estimatedTime: new Date(estimatedTime),
                        totalHarga: parseFloat(totalHarga),
                        orderProducts: {
                            create: await Promise.all(products.map(async product => {
                                let existingProduct = await prisma.product.findUnique({
                                    where: { kode_produk: product.kode_produk }
                                });
                                if (!existingProduct) {
                                    existingProduct = await prisma.product.create({
                                        data: {
                                            kode_produk: product.kode_produk,
                                            nama_produk: product.nama_produk,
                                            jumlah_produk: product.jumlah_produk,
                                            deskripsi: product.deskripsi,
                                            productMaterials: {
                                                create: product.productMaterials.map(material => ({
                                                    material: { connect: { id: material.material_id } },
                                                    quantity: material.quantity
                                                }))
                                            }
                                        }
                                    });
                                } else {
                                    await prisma.productMaterial.deleteMany({
                                        where: { product_id: existingProduct.id }
                                    });

                                    await prisma.productMaterial.createMany({
                                        data: product.productMaterials.map(material => ({
                                            product_id: existingProduct.id,
                                            material_id: material.material_id,
                                            quantity: material.quantity
                                        }))
                                    });
                                }
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
                                    product_id: existingProduct.id
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

                return newOrder;
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

    updateStatus: async (id, status) => {
        try {
            const order = await prisma.order.findUnique({
                where: { id: parseInt(id) },
                include: {
                    orderProducts: {
                        include: {
                            product: {
                                include: {
                                    productMaterials: true,
                                },
                            },
                        },
                    },
                },
            });

            if (!order) {
                throw new Error('Order not found');
            }

            if (status === 'CANCELLED') {
                return await prisma.$transaction(async (prisma) => {
                    for (const orderProduct of order.orderProducts) {
                        for (const productMaterial of orderProduct.product.productMaterials) {
                            const materialMovements = await prisma.materialMovement.findMany({
                                where: {
                                    material_id: productMaterial.material_id,
                                    type: 'KELUAR',
                                    quantity: productMaterial.quantity,
                                    material: {
                                        productMaterials: {
                                            some: {
                                                product_id: orderProduct.product_id,
                                            },
                                        },
                                    },
                                },
                            });
                            await prisma.material.update({
                                where: { id: productMaterial.material_id },
                                data: {
                                    quantity: {
                                        increment: productMaterial.quantity,
                                    },
                                },
                            });
                            await prisma.materialMovement.deleteMany({
                                where: {
                                    id: {
                                        in: materialMovements.map(movement => movement.id),
                                    },
                                },
                            });
                        }
                    }
                    const productIds = order.orderProducts.map(op => op.product.id);
                    await prisma.orderProduct.deleteMany({
                        where: { order_id: parseInt(id) },
                    });

                    for (const productId of productIds) {
                        const isSharedProduct = await prisma.orderProduct.count({
                            where: {
                                product_id: productId,
                                NOT: {
                                    order_id: parseInt(id),
                                },
                            },
                        });

                        if (isSharedProduct === 0) {
                            await prisma.productMaterial.deleteMany({
                                where: { product_id: productId },
                            });
                            await prisma.product.deleteMany({
                                where: { id: productId },
                            });
                        }
                    }
                    return await prisma.order.update({
                        where: { id: parseInt(id) },
                        data: {
                            status: 'CANCELLED',
                            totalHarga: 0,
                        },
                    });
                });
            } else {
                return await prisma.order.update({
                    where: { id: parseInt(id) },
                    data: { status },
                });
            }
        } catch (error) {
            console.error(`Failed to update order status: ${error.message}`);
            throw new Error(`Failed to update order status: ${error.message}`);
        }
    },


    delete: async (id) => {
        try {
            const order = await prisma.order.findUnique({
                where: { id: parseInt(id) },
                include: {
                    orderProducts: {
                        include: {
                            product: {
                                include: {
                                    productMaterials: true
                                }
                            }
                        }
                    }
                }
            });

            if (!order) {
                throw new Error('Order not found');
            }

            return await prisma.$transaction(async (prisma) => {
                for (const orderProduct of order.orderProducts) {
                    for (const productMaterial of orderProduct.product.productMaterials) {
                        const materialMovements = await prisma.materialMovement.findMany({
                            where: {
                                material_id: productMaterial.material_id,
                                type: 'KELUAR',
                                quantity: productMaterial.quantity,
                                material: {
                                    productMaterials: {
                                        some: {
                                            product_id: orderProduct.product_id,
                                        }
                                    }
                                }
                            }
                        });

                        await prisma.material.update({
                            where: { id: productMaterial.material_id },
                            data: {
                                quantity: {
                                    increment: productMaterial.quantity,
                                }
                            }
                        });

                        await prisma.materialMovement.deleteMany({
                            where: {
                                id: {
                                    in: materialMovements.map(movement => movement.id),
                                }
                            }
                        });
                    }
                }

                const productIds = order.orderProducts.map(op => op.product.id);
                await prisma.orderProduct.deleteMany({
                    where: { order_id: parseInt(id) },
                });
                for (const productId of productIds) {
                    const isSharedProduct = await prisma.orderProduct.count({
                        where: {
                            product_id: productId,
                            NOT: {
                                order_id: parseInt(id)
                            }
                        }
                    });

                    if (isSharedProduct === 0) {
                        await prisma.productMaterial.deleteMany({
                            where: { product_id: productId }
                        });

                        await prisma.product.deleteMany({
                            where: { id: productId }
                        });
                    }
                }

                return await prisma.order.delete({
                    where: { id: parseInt(id) },
                });
            });
        } catch (error) {
            console.error(`Failed to delete order: ${error.message}`);
            throw new Error(`Failed to delete order: ${error.message}`);
        }
    },

};

export default Order;
