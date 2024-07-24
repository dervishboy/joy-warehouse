import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const MaterialMovement = {
    getAll: async ({ searchQuery }) => {
        try {
            const response = await prisma.materialMovement.findMany({
                where: searchQuery ? {
                    type: {
                        equals: searchQuery.toUpperCase(),
                    },
                } : {}
            });
            return response;
        } catch (error) {
            throw new Error(`Failed to get material movements: ${error.message}`);
        }
    },
    createIn: async (data) => {
        try {
            const materialMovement = await prisma.materialMovement.create({
                data: {
                    ...data,
                    type: 'MASUK'
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
                    type: 'KELUAR'
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
            });
            return response;
        } catch (error) {
            return error;
        }
    },
}

export default MaterialMovement;