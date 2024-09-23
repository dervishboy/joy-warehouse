import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const MaterialMovement = {
    getAllMasuk: async ({ searchQuery, month, page, rowsPerPage }) => {
        try {
            const whereClause = {
                AND: [
                    searchQuery
                        ? {
                            material: {
                                nama_material: {
                                    contains: searchQuery,
                                },
                            },
                        }
                        : {},
                    month
                        ? {
                            date: {
                                gte: new Date(`${month}-01`),
                                lt: new Date(`${month}-01`),
                            },
                        }
                        : {},
                ],
            };

            const totalMasuk = await prisma.materialMovement.count({
                where: {
                    ...whereClause,
                    type: 'MASUK',
                },
            });

            const materialsMasuk = await prisma.materialMovement.findMany({
                where: {
                    ...whereClause,
                    type: 'MASUK',
                },
                skip: page * rowsPerPage,
                take: rowsPerPage,
                include: {
                    material: true,
                    order: {
                        select: {
                            kode_pesanan: true,
                        },
                    },
                },
            });

            return { materialsMasuk, totalMasuk };
        } catch (error) {
            throw new Error(`Gagal mengambil data masuk: ${error.message}`);
        }
    },

    getAllKeluar: async ({ searchQuery, month, page, rowsPerPage }) => {
        try {
            const whereClause = {
                AND: [
                    searchQuery
                        ? {
                            material: {
                                nama_material: {
                                    contains: searchQuery,
                                },
                            },
                        }
                        : {},
                    month
                        ? {
                            date: {
                                gte: new Date(`${month}-01`),
                                lt: new Date(`${month}-01`),
                            },
                        }
                        : {},
                ],
            };

            const totalKeluar = await prisma.materialMovement.count({
                where: {
                    ...whereClause,
                    type: 'KELUAR',
                },
            });

            const materialsKeluar = await prisma.materialMovement.findMany({
                where: {
                    ...whereClause,
                    type: 'KELUAR',
                },
                skip: page * rowsPerPage,
                take: rowsPerPage,
                include: {
                    material: true,
                    order: {
                        select: {
                            kode_pesanan: true,
                        },
                    },
                },
            });

            return { materialsKeluar, totalKeluar };
        } catch (error) {
            throw new Error(`Gagal mengambil data keluar: ${error.message}`);
        }
    },
    
    createIn: async (data) => {
        try {
            const materialMovement = await prisma.materialMovement.create({
                data: {
                    ...data,
                    type: 'MASUK',
                    order_id: data.order_id || null,
                }
            });
            await prisma.material.update({
                where: { id: data.material_id },
                data: {
                    quantity: {
                        increment: data.quantity
                    }
                }
            });
            return materialMovement;
        } catch (error) {
            return error;
        }
    },

    createOut: async (data) => {
        try {
            const materialMovement = await prisma.materialMovement.create({
                data: {
                    ...data,
                    type: 'KELUAR',
                    order_id: data.order_id || null,
                }
            });
            await prisma.material.update({
                where: { id: data.material_id },
                data: {
                    quantity: {
                        decrement: data.quantity
                    }
                }
            });
            return materialMovement;
        } catch (error) {
            return error;
        }
    },

    getById: async (id) => {
        try {
            const response = await prisma.materialMovement.findUnique({
                where: { id: parseInt(id) },
                include: {
                    material: true,
                    order: {
                        select: {
                            kode_pesanan: true,
                        },
                    },
                },
            });
            return response;
        } catch (error) {
            return error;
        }
    },
}

export default MaterialMovement;
