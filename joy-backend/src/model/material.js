import { PrismaClient } from '@prisma/client';
import { response } from 'express';
const prisma = new PrismaClient();

const Material = {
    getAll: async ({ searchQuery }) => {
        try {
            const response = await prisma.material.findMany({
                where: searchQuery ? {
                    nama_material: {
                        contains: searchQuery,
                    }
                } : {}
            });
            return response;
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