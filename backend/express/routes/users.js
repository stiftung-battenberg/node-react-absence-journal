const { models } = require('../../database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require("dotenv").config();

async function getAll(req, res) {
    const users = await models.user.findAll();
    res.status(200).json(users)
}

async function create(req, res) {
    try {

        const { email, password } = req.body
    
        if(!(email && password)) {
            res.status(400).send("All input are required")
        }

        encryptedUserPassword = await bcrypt.hash(password, 10);

        
        const user = await models.user.create({
            email,
            password: encryptedUserPassword,
        })
        
        const token = jwt.sign(
            { user_id: user.id, email },
            process.env.TOKEN_KEY,
            {
                expiresIn: "5h",
            }
        )

        user.token = token
        
        res.status(201).end(user)
    } catch (error) {
        res.status(400).send("An error occured !")
        console.log(error)
    }
}

module.exports = {
    create,
    getAll
}