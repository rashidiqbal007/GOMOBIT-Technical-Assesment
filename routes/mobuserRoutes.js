const express = require("express");
const router = express.Router();
require('dotenv').config()
const MobUser = require("../models/mobuserModel")
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../Middlewares/authMiddlewares")

router.post("/add-mob-user", authMiddleware, async (req, res) => {
    try {
        const userExists = await MobUser.findOne({ email: req.body.email })
        if (userExists) {

            res.status(200).send({ message: "User Already Exists", success: false });

        }
        else{
        const newmobuser = new MobUser({ ...req.body });
        await newmobuser.save();
        res.status(200).send({
            message: "User added successfully!",
            success: true,
        })
    }
}
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error adding new user to database", success: false, error });

    }
});
// get-all-mob-users
router.get("/get-mob-users", authMiddleware, async (req, res) => {
    try {
        const mobusers = await MobUser.find({});

        res.status(200).send({
            success: true,
            message: "Users Fetched Successfully",
            data: mobusers,
        });


    }
    catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error fetching users ", success: false, error });

    }
});

module.exports = router;