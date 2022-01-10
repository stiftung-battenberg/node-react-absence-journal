const { models } = require('../../database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require("../middleware/auth")

require("dotenv").config();

module.exports = (app) => {

    
    app.get("/api/users", auth.verifyToken, auth.isAdmin, async (req, res) => {
        const users = await models.user.findAll();
        res.status(200).json(users)
    })
    
    app.post('/api/users', auth.verifyToken, auth.isAdmin, async (req, res) => {
        try {
    
            const { email, name, isAdmin } = req.body
        
            if(!(email && name)) {
                return res.status(400).send("All input are required")
            }
    
            encryptedUserPassword = await bcrypt.hash("Battenberg2021", 10);
            
            
            await models.user.create({
                email,
                name,
                isAdmin,
                password: encryptedUserPassword,
            })
        
            res.status(201).send("User was created !")
        } catch (error) {
            res.status(400).send("An error occured !")
            console.log(error)
        }
    })

    app.delete("/api/user/:id", auth.verifyToken, auth.isAdmin, async (req, res) => {
        await models.user.destroy({
            where: {
              id: req.params.id
            }
        })
        res.status(200).send()
    })
}
