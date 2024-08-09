import { PrismaClient } from '@prisma/client';
import { response } from 'express';
const prisma = new PrismaClient();

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
                skip: page * rowsPerPage,
                take: rowsPerPage,
            });

            return { materials, totalMaterials };
        } catch (error) {
            throw new Error(`Failed to get materials: ${error.message}`);
        }
    },
    getById: async (id) => {
        try {
            const response = await prisma.material.findUnique({
                where: { id: parseInt(id) },
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    create: async (data) => {
        try {
            const response = await prisma.material.create({
                data,
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
            const response = await prisma.material.delete({
                where: { id: parseInt(id) },
            });
            return response;
        } catch (error) {
            return error;
        }
    },
};

export default Material;