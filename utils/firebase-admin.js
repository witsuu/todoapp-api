var admin = require("firebase-admin");

var serviceAccount = require("./service-accout.json");

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount),
	databaseURL:
		"https://todolist-witsuu-default-rtdb.asia-southeast1.firebasedatabase.app",
});

const db = admin.firestore();

module.exports = { admin, db };
