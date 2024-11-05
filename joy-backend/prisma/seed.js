import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient();

async function seeder() {
    try {
        const materials = await prisma.material.createMany({
            data: [
                { kode_material: 'M001', nama_material: 'Akrilik 2mm bening', satuan: 'Lembar' },
                { kode_material: 'M002', nama_material: 'Akrilik 2mm putih', satuan: 'Lembar' },
                { kode_material: 'M003', nama_material: 'Akrilik 2mm hitam', satuan: 'Lembar' },
                { kode_material: 'M004', nama_material: 'Akrilik 3mm bening', satuan: 'Lembar' },
                { kode_material: 'M005', nama_material: 'Akrilik 3mm putih', satuan: 'Lembar' },
                { kode_material: 'M006', nama_material: 'Akrilik 3mm hitam', satuan: 'Lembar' },
                { kode_material: 'M007', nama_material: 'Akrilik 4mm bening', satuan: 'Lembar' },
                { kode_material: 'M008', nama_material: 'Akrilik 5mm bening', satuan: 'Lembar' },
                { kode_material: 'M009', nama_material: 'Akrilik 10mm bening', satuan: 'Lembar' },
                { kode_material: 'M010', nama_material: 'Stiker', satuan: 'Lembar' },
                { kode_material: 'M011', nama_material: 'Lem Dexton', satuan: 'Pcs' },
                { kode_material: 'M012', nama_material: 'Lem Silicone', satuan: 'Pcs' },
                { kode_material: 'M013', nama_material: 'Lem Akrilik', satuan: 'Pcs' },
                { kode_material: 'M014', nama_material: 'Kabel Federal', satuan: 'Meter' },
                { kode_material: 'M015', nama_material: 'Kabel Instalasi', satuan: 'Meter' },
                { kode_material: 'M016', nama_material: 'Adaptor 10W', satuan: 'Pcs' },
                { kode_material: 'M017', nama_material: 'Adaptor 15W', satuan: 'Pcs' },
                { kode_material: 'M018', nama_material: 'Adaptor 20W', satuan: 'Pcs' },
                { kode_material: 'M019', nama_material: 'Adaptor 150W', satuan: 'Pcs' },
                { kode_material: 'M020', nama_material: 'Kabel ties', satuan: 'Pcs' },
                { kode_material: 'M021', nama_material: 'Double tip 3M (abu - abu)', satuan: 'Pcs' },
                { kode_material: 'M022', nama_material: 'Double tip 3M (merah)', satuan: 'Pcs' },
                { kode_material: 'M023', nama_material: 'Tc', satuan: 'Pcs' },
                { kode_material: 'M024', nama_material: 'Skrup Gypsum S6', satuan: 'Pcs' },
                { kode_material: 'M025', nama_material: 'Roping', satuan: 'Pcs' },
                { kode_material: 'M026', nama_material: 'Skrup putih', satuan: 'Pcs' },
                { kode_material: 'M027', nama_material: 'Fisher S6', satuan: 'Pcs' },
                { kode_material: 'M028', nama_material: 'Rippet', satuan: 'Pcs' },
                { kode_material: 'M029', nama_material: 'Lampu LED Modul', satuan: 'Pcs' },
                { kode_material: 'M030', nama_material: 'Lampu Neon', satuan: 'Pcs' },
                { kode_material: 'M031', nama_material: 'Neon Flexible pink', satuan: 'Roll' },
                { kode_material: 'M032', nama_material: 'Neon Flex biru', satuan: 'Roll' },
                { kode_material: 'M033', nama_material: 'Neon Flex kuning', satuan: 'Roll' },
                { kode_material: 'M034', nama_material: 'Neon Flex putih', satuan: 'Roll' },
                { kode_material: 'M035', nama_material: 'Solasi Kabel', satuan: 'Roll' },
                { kode_material: 'M036', nama_material: 'Solasi Kertas', satuan: 'Roll' },
                { kode_material: 'M037', nama_material: 'Gantungan Kunci', satuan: 'Pcs' },
                { kode_material: 'M038', nama_material: 'Besi Holo', satuan: 'Cm' },
                { kode_material: 'M039', nama_material: 'Besi Pipa', satuan: 'Cm' },
            ]
        });

        const hashedPassword = await bcrypt.hash('admin', 10);

        const adminUser = await prisma.user.create({
            data: {
                email: 'admin@admin.com',
                name: 'Admin',
                password: hashedPassword,
                role: 'ADMIN',
            },
        });

        const inventaris = await prisma.inventaris.createMany({
            data: [
                {nama_barang: 'Mesin Las', quantity: 1, satuan: 'Unit'},
                {nama_barang: 'Mesin Laser', quantity: 2, satuan: 'Unit'},
                {nama_barang: 'Mesin Cutting Sticker', quantity: 2, satuan: 'Unit'},
                {nama_barang: 'Mesin Bending (120 cm)', quantity: 1, satuan: 'Unit'},
                {nama_barang: 'Mesin Bending (10 cm)', quantity: 1, satuan: 'Unit'},
                {nama_barang: 'Bor Kabel', quantity: 3, satuan: 'Unit'},
                {nama_barang: 'Bor Cordless', quantity: 2, satuan: 'Unit'},
                {nama_barang: 'Hot Gun', quantity: 3, satuan: 'Unit'},
                {nama_barang: 'Kompresor', quantity: 2, satuan: 'Unit'},
                {nama_barang: 'Scafolding', quantity: 2, satuan: 'Set'},
                {nama_barang: 'Tangga', quantity: 2, satuan: 'Set'},
                {nama_barang: 'Komputer', quantity: 3, satuan: 'Unit'},
                {nama_barang: 'Gerinda', quantity: 2, satuan: 'Unit'},
                {nama_barang: 'Mesin Potong Besi', quantity: 2, satuan: 'Unit'},
                {nama_barang: 'Torch', quantity: 2, satuan: 'Unit'},
            ]
        })

        console.log('Database has been seeded successfully');

    } catch (error) {
        console.error('Failed to seed database', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

seeder();
