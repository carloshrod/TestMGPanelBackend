const UserModel = require('../models/userModel');

const verifyExistingUser = async (req, res, next) => {
	try {
		const { email } = req.body;
		const { _id } = req?.params;

		const existingUser = await UserModel.findOne({ email });
		if (JSON.stringify(existingUser?._id) !== JSON.stringify(_id)) {
			if (existingUser) {
				return res.status(400).send({ msg: 'Este email ya está registrado!' });
			}
		}
		next();
	} catch (error) {
		res.status(500).send({ msg: error.message });
	}
};

module.exports = verifyExistingUser;
