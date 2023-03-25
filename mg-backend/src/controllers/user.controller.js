const UserModel = require('../models/userModel');

const getAllUsers = async (req, res, next) => {
	try {
		const foundUsers = await UserModel.find();
		if (foundUsers.length > 0) {
			return res.status(200).send(foundUsers);
		}
		return res.status(204).send();
	} catch (error) {
		next(error);
	}
};

const getOneUser = async (req, res, next) => {
	try {
		const foundUser = await UserModel.findById(req.params);
		if (foundUser) {
			return res.status(200).send(foundUser);
		}
		return res.status(404).send();
	} catch (error) {
		next(error);
	}
};

const createUser = async (req, res, next) => {
	try {
		const newUser = new UserModel(req.body);
		const savedUser = await newUser.save();
		if (savedUser) {
			return res.status(201).send(savedUser);
		}
	} catch (error) {
		next(error);
	}
};

const updateUser = async (req, res, next) => {
	try {
		const updatedUser = await UserModel.findByIdAndUpdate(
			req.params,
			{ $set: req.body },
			{ new: true }
		);
		if (updatedUser) {
			return res.status(200).send(updatedUser);
		}
		return res.status(404).send();
	} catch (error) {
		next(error);
	}
};

const unsubscribeUser = async (req, res, next) => {
	try {
		const unsubscribedUser = await UserModel.findByIdAndUpdate(
			req.params,
			{ $set: { subscribed: false } },
			{ new: true }
		);
		if (unsubscribedUser) {
			return res.status(200).send();
		}
		return res.status(404).send();
	} catch (error) {
		next(error);
	}
};

const deleteUser = async (req, res, next) => {
	try {
		const deletedUser = await UserModel.findByIdAndDelete(req.params);
		if (deletedUser) {
			return res.status(200).send();
		}
		res.status(404).send();
	} catch (error) {
		next(error);
	}
};

module.exports = {
	getAllUsers,
	getOneUser,
	createUser,
	updateUser,
	unsubscribeUser,
	deleteUser,
};
