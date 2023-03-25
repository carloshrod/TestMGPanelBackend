const { Router } = require('express');
const {
	getAllUsers,
	getOneUser,
	createUser,
	updateUser,
	deleteUser,
	unsubscribeUser,
} = require('../controllers/user.controller');
const verifyExistingUser = require('../middlewares/verifyExistingUser');

const userRoutes = Router();

userRoutes.get('/', getAllUsers);
userRoutes.get('/:_id', getOneUser);
userRoutes.post('/', verifyExistingUser, createUser);
userRoutes.put('/:_id', verifyExistingUser, updateUser);
userRoutes.patch('/:_id', unsubscribeUser);
userRoutes.delete('/:_id', deleteUser);

module.exports = userRoutes;
