const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const PORT = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
	res.send("Welcome to TODO API!");
});

const authRoute = require("./routes/authRoute");
app.use("/user", authRoute);

app.listen(PORT, () => {
	console.log(`SERVER IS lISTENING ON PORT ${PORT}`);
});
