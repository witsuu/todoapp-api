const { db } = require("../../utils/firebase-admin");
const {
	signInValidation,
	signUpValidation,
} = require("../middlewares/authValidate");
const bcrypt = require("bcrypt");
const { v4 } = require("uuid");

const signUp = async (req, res) => {
	// check input validation
	const { error } = signUpValidation(req.body);

	if (error) return res.status(400).send(error.details[0].message);

	const emailExist = await db
		.collection("users")
		.where("email", "==", req.body.email)
		.get();
	if (!emailExist.empty) return res.status(400).send("Email Already in use!");

	const salt = await bcrypt.genSalt(10);
	const hashPass = await bcrypt.hash(req.body.password, salt);

	const savedUser = {
		username: req.body.username,
		email: req.body.email,
		password: hashPass,
	};

	try {
		const userRef = db.collection("users").doc(v4());
		const storeUser = await userRef.set(savedUser);

		return res.send(storeUser);
	} catch (error) {
		return res.status(500).send(`${error}`);
	}
};

module.exports = {
	signUp,
};
