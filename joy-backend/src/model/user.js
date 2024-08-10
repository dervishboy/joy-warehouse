import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const User = {
    getAll : async ({searchQuery, page, rowsPerPage}) => {
        try {
            const whereClause = searchQuery 
            ? {
                name: {
                    contains: searchQuery,
                },
            } : {};

            const totalUsers = await prisma.user.count({
                where: whereClause,
            });

            const users = await prisma.user.findMany({
                where: whereClause,
                skip: page * rowsPerPage,
                take: rowsPerPage,
            });

            return { users, totalUsers };
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