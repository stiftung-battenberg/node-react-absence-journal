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
    
            const { email } = req.body
        
            if(!(email)) {
                return res.status(400).send("All input are required")
            }
    
            encryptedUserPassword = await bcrypt.hash("Battenberg2021", 10);
            
            
            const user = await models.user.create({
                email,
                password: encryptedUserPassword,
            })
            
            const token = jwt.sign(
                { user_id: user.id, email },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            )
    
            user.token = token
            
            await user.save()
    
            res.status(201).end("User was created !")
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
        res.status(200)
    })
}
