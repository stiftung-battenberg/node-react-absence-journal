const { models } = require('../../database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require("dotenv").config();

module.exports = (app) => { 
    app.post('/api/login', async (req, res) => {
        //some login action going here 
        const { email, password} = req.body

        if(!(email && password)) {
            res.status(400)
        }
        
        const user = await models.user.findOne({ 
            where: {
                email
            } 
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
              { user_id: user.id, email },
              process.env.TOKEN_KEY,
              {
                expiresIn: "5h",
              }
            )
            console.log(token)
            user.token = token;
        }

        return res.status(200).json(user);
    })
}