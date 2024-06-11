const UserManager = require('../dao/managers/MDB/userManager');

class UserController {
    constructor() {
        this.userManager = new UserManager();
    }

    async getUsers(page = 1) {
        try {
            const options = { page, limit: 10 };
            const result = await this.userManager.getUsersPaginate(options);
    
            return result;
        } catch (error) {
            console.error('Error al obtener los usuarios:', error);
            throw new Error('Error interno del servidor');
        }
    }
    getUsersBy = async (req, res) => {
        const query = req.query;
        try {
            const result = await this.userManager.getUsersBy(query);
            res.send(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    createUser = async (req, res) => {
        const userData = req.body;
        try {
            const result = await this.userManager.createUser(userData);
            res.send(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    updateUser = async (req, res) => {
        const { uid } = req.params;
        const userData = req.body;
        console.log('Datos del usuario a actualizar:', userData);
        try {
            const result = await this.userManager.updateUser(uid, userData);
            res.send(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    deleteUser = async (req, res) => {
        const { uid } = req.params; 
        try {
            const result = await this.userManager.deleteUser(uid); 
            console.log(`Usuario eliminado correctamente: ${uid}`);
            res.send(result);
        } catch (error) {
            console.error('Error al eliminar usuario:', error);
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }

    getUserById = async (req, res) => {
        const { id } = req.params;
        try {
            const result = await this.userManager.getUserById(id);
            res.send(result);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'Error interno del servidor' });
        }
    }
}

module.exports = UserController;
