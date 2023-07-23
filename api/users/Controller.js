// const getUserProfile =  (req, res) => {
//     res.send('Hello BQ!')
// }
require('dotenv').config()
const User = require('./schema')
const mongoose = require('mongoose')
const { hash, compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')



// login
const login = async (req, res) => {
    const { email, password } = req.body
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const existingUser = await User.findOne({ email: email })

        if (!existingUser) {
            res.status(404).json({
                message: "User not found"
            })
        }
        else {
            const decryptPassword = await compare(password, existingUser.password)
            if (email == existingUser.email && decryptPassword) {
                const token = sign(
                    {
                        id: existingUser._id,
                        username: existingUser.username,
                        email: existingUser.email
                    },
                    process.env.JWT_SECRET
                )
                res.json({
                    message: "Successfully Loggined",
                    token: token
                })
            }
            else {
                res.json({
                    message: "invalid Credentials"
                })
            }
        }
    }
    catch (error) {
        res.json({
            message: error.message
        })
    }}


// signup
const signup = async (req, res) => {
    const { username, email, password } = req.body
    console.log({ username, email, password })

    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("DB Connected")
        const existingUser = await User.exists({ email: email })
        if (existingUser) {
            res.status(208).json({
                message: "User Already Exists"
            })
        }

        else {
            await User.create({ username, email, password: await hash(password, 12) })
            console.log("User Created")
            res.status(201).json({
                message: "Signup Successfully"
            })
        }
    }
    
     catch (error) {
        res.json({
            message: error.message
        })
    }

}

// allUsers
const allUsers = async (req, res) => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const Users = await User.find()
        res.json(
            {
                Users: Users
            }
        )}
    catch (error) {
        res.json(
            {
                message: error.message
            }
        )
    }}


// userbyEmail
const userbyEmail = async (req, res) => {
    const { email } = req.params
    try {
        await mongoose.connect(process.env.MONGO_URI)
        const Users = await User.findOne({ email: email })
        res.json(
            {
                Users: Users
            }
        )}

    catch (error) {
        res.json(
            {
                message: error.message
            }
        )
    }}

module.exports = { signup, login ,allUsers ,userbyEmail }