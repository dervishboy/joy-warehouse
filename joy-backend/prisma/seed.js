import { PrismaClient } from '@prisma/client';
// import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function seeder() {
    try {

        const materials = await prisma.material.createMany({
            data: [
                { kode_material: 'M001', nama_material: 'Akrilik 2mm bening', satuan: 'Cm' },
                { kode_material: 'M002', nama_material: 'Akrilik 2mm putih', satuan: 'Cm' },
                { kode_material: 'M003', nama_material: 'Akrilik 2mm hitam', satuan: 'Cm' },
                { kode_material: 'M004', nama_material: 'Akrilik 3mm bening', satuan: 'Cm' },
                { kode_material: 'M005', nama_material: 'Akrilik 3mm putih', satuan: 'Cm' },
                { kode_material: 'M006', nama_material: 'Akrilik 3mm hitam', satuan: 'Cm' },
                { kode_material: 'M007', nama_material: 'Akrilik 4mm bening', satuan: 'Cm' },
                { kode_material: 'M008', nama_material: 'Akrilik 5mm bening', satuan: 'Cm' },
                { kode_material: 'M009', nama_material: 'Akrilik 10mm bening', satuan: 'Cm' },
                { kode_material: 'M010', nama_material: 'Stiker', satuan: 'Cm' },
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
                { kode_material: 'M031', nama_material: 'Neon Flexible pink', satuan: 'Pack' },
                { kode_material: 'M032', nama_material: 'Neon Flex biru', satuan: 'Pack' },
                { kode_material: 'M033', nama_material: 'Neon Flex kuning', satuan: 'Pack' },
                { kode_material: 'M034', nama_material: 'Neon Flex putih', satuan: 'Pack' },
                { kode_material: 'M035', nama_material: 'Solasi Kabel', satuan: 'Roll' },
                { kode_material: 'M036', nama_material: 'Solasi Kertas', satuan: 'Roll' },
            ]
        });

        // console.log('Seeding success', roles, users, materials);

    } catch (error) {
        console.error('Failed to seed database', error.message);
    } finally {
        await prisma.$disconnect();
    }
}

seeder();
