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

const Material = {
    getAll: async ({ searchQuery, page, rowsPerPage }) => {
        try {
            const whereClause = searchQuery
                ? {
                    nama_material: {
                        contains: searchQuery,
                    },
                }
                : {};

            const totalMaterials = await prisma.material.count({
                where: whereClause,
            });
            const materials = await prisma.material.findMany({
                where: whereClause,
                skip: rowsPerPage === -1 ? 0 : page * rowsPerPage,
                take: rowsPerPage === -1 ? undefined : rowsPerPage,
            });

            return { materials, totalMaterials };
        } catch (error) {
            throw new Error(`Failed to get materials: ${error.message}`);
        }
    },

    getById: async (id, page = 1, pageSize = 10) => {
        try {
            const response = await prisma.material.findUnique({
                where: { id: parseInt(id) },
                include: {
                    movements: {
                        skip: (page - 1) * pageSize,
                        take: pageSize,
                        include: {
                            order: {
                                select: {
                                    kode_pesanan: true,
                                },
                            },
                        },
                    },
                },
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    
    create: async (data) => {
        try {
            const kodeMaterial = await generateNextKode('M', 'material', 'kode_material');
            const response = await prisma.material.create({
                data: {
                    ...data,
                    kode_material: kodeMaterial,
                },
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    update: async (id, data) => {
        try {
            const response = await prisma.material.update({
                where: { id: parseInt(id) },
                data: {
                    ...data,
                },
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    delete: async (id) => {
        try {
            const MaterialWithMovements = await prisma.material.findUnique({
                where: { id: parseInt(id) },
                include: {
                    movements: true,
                },
            });

            if (!MaterialWithMovements) {
                throw new Error('Material not found');
            }

            await prisma.$transaction(async (prisma) => {
                await prisma.materialMovement.deleteMany({
                    where: {
                        material_id: parseInt(id),
                    },
                });
                await prisma.material.delete({
                    where: { id: parseInt(id) },
                });
            });
            console.log('Material deleted successfully');
        } catch (error) {
            throw new Error(`Failed to delete material: ${error.message}`);
        }
    },
};

export default Material;