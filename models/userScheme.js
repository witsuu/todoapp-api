const { db } = require("../utils/firebase-admin");

exports.userScheme = async (req, res) => {
	const User = db.collection("users");

	try {
		User.get().then((snapshot) => {
			const data = snapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));

			return res.status(201).send(data);
		});
	} catch (error) {
		return res.sendStatus(error);
	}
};
