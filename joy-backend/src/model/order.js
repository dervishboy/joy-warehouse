import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const generateNextKode = async (prefix, model, kodeField, increment = 0) => {
    const lastItem = await prisma[model].findFirst({
        orderBy: { [kodeField]: 'desc' },
        take: 1,
    });

    let newKode = `${prefix}001`;
    if (lastItem) {
        const lastKode = lastItem[kodeField];
        const numericPart = parseInt(lastKode.replace(prefix, '')) + increment + 1;
        newKode = `${prefix}${numericPart.toString().padStart(3, '0')}`;
    }

    return newKode;
};

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
                orderBy: {
                    id: 'desc',
                },
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

    // generateNextKode: async (prefix, model, kodeField) => {
    //     const lastItem = await prisma[model].findFirst({
    //         orderBy: {
    //             [kodeField]: 'desc',
    //         },
    //         take: 1,
    //     });
    
    //     let newKode;
    //     if (!lastItem) {
    //         newKode = `${prefix}001`;
    //     } else {
    //         const lastKode = lastItem[kodeField];
    //         const numericPart = parseInt(lastKode.replace(prefix, '')) + 1;
    //         const numericPartLength = lastKode.length - prefix.length;
    //         newKode = `${prefix}${numericPart.toString().padStart(numericPartLength, '0')}`;
    //     }
    
    //     return newKode;
    // },
    
    create: async (data) => {
        const { nama_pemesan, estimatedTime, products, totalHarga } = data;
    
        try {
            const newOrder = await prisma.$transaction(async (tx) => {
                const kode_pesanan = await generateNextKode('PSN', 'order', 'kode_pesanan');
                const createdOrder = await tx.order.create({
                    data: {
                        nama_pemesan,
                        kode_pesanan,
                        estimatedTime: new Date(estimatedTime),
                        totalHarga: parseFloat(totalHarga),
                    },
                });
    
                const productPromises = products.map(async (product, index) => {
                    const kode_produk = await generateNextKode('PRD', 'product', 'kode_produk', index);
    
                    const existingProduct = await tx.product.upsert({
                        where: { kode_produk },
                        update: {},
                        create: {
                            kode_produk,
                            nama_produk: product.nama_produk,
                            jumlah_produk: product.jumlah_produk,
                            deskripsi: product.deskripsi,
                            productMaterials: {
                                create: product.productMaterials.map((material) => ({
                                    material: { connect: { id: material.material_id } },
                                    quantity: material.quantity,
                                })),
                            },
                        },
                    });
    
                    await tx.productMaterial.deleteMany({
                        where: { product_id: existingProduct.id },
                    });
    
                    await tx.productMaterial.createMany({
                        data: product.productMaterials.map((material) => ({
                            product_id: existingProduct.id,
                            material_id: material.material_id,
                            quantity: material.quantity,
                        })),
                    });
    
                    // Validasi stok dan perbarui kuantitas material
                    for (const material of product.productMaterials) {
                        const materialData = await tx.material.findUnique({
                            where: { id: material.material_id },
                            select: { quantity: true }
                        });
    
                        if (materialData.quantity < material.quantity) {
                            throw new Error(`Jumlah material ${material.material_id} tidak mencukupi untuk produk ${product.nama_produk}.`);
                        }
    
                        await tx.material.update({
                            where: { id: material.material_id },
                            data: { quantity: { decrement: material.quantity } },
                        });
                    }
    
                    return { order_id: createdOrder.id, product_id: existingProduct.id };
                });
    
                // Create orderProducts entries
                const orderProducts = await Promise.all(productPromises);
                await tx.orderProduct.createMany({ data: orderProducts });
    
                // Create material movements of type "KELUAR" for each material used
                const materialMovements = products.flatMap((product) =>
                    product.productMaterials.map((material) => ({
                        material_id: material.material_id,
                        order_id: createdOrder.id,
                        quantity: material.quantity,
                        type: 'KELUAR',
                    }))
                );
    
                await tx.materialMovement.createMany({ data: materialMovements });
    
                return createdOrder;
            });
    
            return newOrder;
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
