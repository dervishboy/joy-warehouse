import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const Inventaris = {
    getAll: async ({ searchQuery, page, rowsPerPage }) => {
        try {
            const whereClause = searchQuery
                ? {
                    nama_barang: {
                        contains: searchQuery,
                    },
                }
                : {};

            const totalInventaris = await prisma.inventaris.count({
                where: whereClause,
            });
        
            const inventaris = await prisma.inventaris.findMany({
                where: whereClause,
                skip: page * rowsPerPage,
                take: rowsPerPage,
            });
            return { inventaris, totalInventaris };
        } catch (error) {
            throw new Error(`Failed to get inventaris: ${error.message}`);
        }
    },
    getById: async (id) => {
        try {
            const response = await prisma.inventaris.findUnique({
                where: { id: parseInt(id) },
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    create: async (data) => {
        try {
            const response = await prisma.inventaris.create({
                data,
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    update: async (id, data) => {
        try {
            const response = await prisma.inventaris.update({
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
            const response = await prisma.inventaris.delete({
                where: { id: parseInt(id) },
            });
            return response;
        } catch (error) {
            return error;
        }
    },
};

export default Inventaris;