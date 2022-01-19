const { models } = require('../../database')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

require("dotenv").config();

module.exports = (app) => { 
    

    app.post('/api/login', async (req, res) => {
        //some login action going here 
        const { email, password} = req.body
        
        if(!(email && password)) {
            return res.status(400).send("Please enter an email and a password !")
        }
        
        const user = await models.user.findOne({ 
            where: {
                email
            } 
        });

        if (user && (await bcrypt.compare(password, user.password))) {
            // Create token
            const token = jwt.sign(
              { user_id: user.id },
              process.env.TOKEN_KEY,
              {
                expiresIn: "1h",
              }
            )

            user.token = token;

            await user.save()
        } else {
            return res.status(400).send(" Wrong credentials ");
        }

        res.cookie('token', user.token, { httpOnly: true, expires: new Date(Date.now() + 3600000)})
        res.cookie('id', user.id)
        res.cookie('isAdmin', user.isAdmin)

        return res.status(200).json();
    })

    app.get('/api/loggedin', async (req, res) => {
        const token = req.body.token || req.query.token || req.cookies.token || req.headers["x-access-token"];
        if (!token) {
            return res.status(200).send(false);
        }
        try {
            const decoded = jwt.verify(token, process.env.TOKEN_KEY);
            req.user = decoded.user_id;
        } catch (err) {
            return res.status(200).send(false);
        }
        return res.status(200).send(true)
    })

    app.get('/api/logout', async (req, res) => {
        res.clearCookie("token")
        return res.status(200).send(true)
    })
}