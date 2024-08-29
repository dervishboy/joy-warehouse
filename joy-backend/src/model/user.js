import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

const User = {
    getAll: async ({ searchQuery, page, rowsPerPage }) => {
        try {
            const whereClause = searchQuery
                ? {
                    name: {
                        contains: searchQuery,
                    },
                }
                : {};

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
            throw new Error(`Failed to get user by ID: ${error.message}`);
        }
    },
    create: async (data) => {
        try {
            const response = await prisma.user.create({
                data,
            });
            return response;
        } catch (error) {
            throw new Error(`Failed to create user: ${error.message}`);
        }
    },
    update: async (id, data) => {
        try {
            if (data.oldPassword && data.newPassword) {
                const user = await prisma.user.findUnique({
                    where: { id: parseInt(id) },
                });

                if (!user) throw new Error('User not found');

                const isMatch = await bcrypt.compare(data.oldPassword, user.password);
                if (!isMatch) throw new Error('Old password is incorrect');
                data.password = await bcrypt.hash(data.newPassword, 10);
            }
            delete data.oldPassword;
            delete data.newPassword;

            const response = await prisma.user.update({
                where: { id: parseInt(id) },
                data,
            });
    
            return response;
        } catch (error) {
            throw new Error(`Failed to update user: ${error.message}`);
        }
    },
    delete: async (id) => {
        try {
            const response = await prisma.user.delete({
                where: { id: parseInt(id) },
            });
            return response;
        } catch (error) {
            throw new Error(`Failed to delete user: ${error.message}`);
        }
    },
    getByEmail: async (email) => {
        try {
            const response = await prisma.user.findUnique({
                where: { email },
            });
            return response;
        } catch (error) {
            throw new Error(`Failed to get user by email: ${error.message}`);
        }
    },
};

export default User;
