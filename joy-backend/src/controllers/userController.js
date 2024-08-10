import User from '../model/user.js';
import bcrypt from 'bcryptjs';

const UserController = {
    getUsers: async (req, res) => {
        try {
            const searchQuery = req.query.searchQuery || '';
            const page = parseInt(req.query.page, 10) || 0;
            const rowsPerPage = parseInt(req.query.rowsPerPage, 10) || 10;

            const { users, totalUsers } = await User.getAll({
                searchQuery,
                page,
                rowsPerPage,
            });

            res.json({
                users,
                totalUsers,
                currentPage: page,
                rowsPerPage,
            });
        } catch (error) {
            console.error('Error in getUsers:', error);
            res.status(500).json({ error: error.message });
        }
    },
    createUser: async (req, res) => {
        const data = req.body;
        try {
            const hashedPassword = await bcrypt.hash(data.password, 10);
            const response = await User.create({...data, password: hashedPassword});
            res.status(201).json(response);
        } catch (error) {
            console.error('Error in createUser:', error);
            res.status(500).json({ error: error.message });
        }
    },
    getUserById: async (req, res) => {
        const { id } = req.params;
        try {
            const response = await User.getById(id);
            if (!response) {
                return res.status(404).send('User not found');
            }
            res.json(response);
        } catch (error) {
            console.error('Error in getUserById:', error);
            res.status(500).json({ error: error.message });
        }
    },
    updateUser: async (req, res) => {
        const { id } = req.params;
        const data = req.body;
        try {
            const response = await User.update(id, data);
            res.json(response);
        } catch (error) {
            console.error('Error in updateUser:', error);
            res.status(500).json({ error: error.message });
        }
    },
    deleteUser: async (req, res) => {
        const { id } = req.params;
        try {
            const response = await User.delete(id);
            res.send('User deleted');
        } catch (error) {
            console.error('Error in deleteUser:', error);
            res.status(500).json({ error: error.message });
        }
    },
};

export default UserController;