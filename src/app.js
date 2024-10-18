const express = require('express')
const app = express()
const dotenv = require('dotenv')
dotenv.config();


const PORT = process.env.PORT;

app.use(express.json());



const authController = require("./auth/auth.controller");
const itemController = require("./item/item.controller");
const userController = require("./user/user.controller");
const transactionController = require("./transaction/transaction.controller");
const adminAuthorization = require('./middleware/adminAuthorization');

app.use("/api/auth", authController);
app.use("/api/items", itemController);
app.use("/api/users", adminAuthorization, userController);
app.use("/api/transactions", transactionController);


app.get("/", (req, res) => {
    res.send("Hello There!")
})
app.listen(PORT, () => {
    console.log('App listening on port' + PORT)
})