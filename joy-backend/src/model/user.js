import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const User = {
    getAll : async ({searchQuery}) => {
        try {
            const response = await prisma.user.findMany({
                where: searchQuery ? {
                    name: {
                        contains: searchQuery,
                    }
                } : {}
            });
            return response;
        } catch (error) {   
            throw new Error(`Failed to get users: ${error.message}`);
        }
    },
    getById: async (id) => {
        try {
            const response = await prisma.user.findUnique({
                where: { id: parseInt(id) },
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    create: async (data) => {
        try {
            const response = await prisma.user.create({
                data,
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    update: async (id, data) => {
        try {
            const response = await prisma.user.update({
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
            const response = await prisma.user.delete({
                where: { id: parseInt(id) },
            });
            return response;
        } catch (error) {
            return error;
        }
    },
    getByEmail: async (email) => {
        try {
            const response = await prisma.user.findUnique({
                where: { email },
            });
            return response;
        } catch (error) {
            return error;
        }
    },
};

export default User;