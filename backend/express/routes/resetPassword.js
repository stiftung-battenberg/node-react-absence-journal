const { models } = require('../../database')
const bcrypt = require('bcryptjs')
const sendEmail = require('../utils/sendEmails') 
const crypto = require("crypto");
const sendmail = require('../utils/sendEmails')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

require("dotenv").config();

module.exports = (app) => { 
    app.post('/api/user/reset-password', async (req, res) => {
        //some login action going here 
        const { email } = req.body

        if(!(email)) {
            res.status(400).send('No email sent')
        }
        
        const user = await models.user.findOne({ 
            where: {
                email
            } 
        })

        await models.ResetToken.update({
            used: 1
          },
          {
            where: {
              email: req.body.email
            }
        })

        if (user) {
            var fpSalt = crypto.randomBytes(64).toString('base64');
            var expireDate = new Date(new Date().getTime() + (60 * 60 * 1000))
            // send an email with jwt that let's reset the password
            await models.ResetToken.create({
                email: req.body.email,
                expiration: expireDate,
                token: fpSalt,
                used: 0
            })

            sendEmail(req.body.email, 
                "Reset your password", 
                'To reset your password, please click the link below.\n\nhttp://'+process.env.DOMAIN+'/user/reset-password?token='+encodeURIComponent(fpSalt)+'&email='+req.body.email)

        } else {
            return res.status(400).send("No user by that email")
        }

        return res.status(200).send("You received a mail with reset information !");
    })

    app.put('/api/user/reset-password/', async (req, res) => {
        //some login action going here
        const { email, token, password } = req.body
        console.log( req.body);
        if(!(email && token && password)) {
            res.status(400).send('Empty fields')
        }

        await models.ResetToken.destroy({
            where: {
              expiration: { [Op.lt]: Sequelize.fn('CURDATE')},
            }
        })

        const resetToken = await models.ResetToken.findOne({
            where: {
                token,
                email
            }
        })

        if(resetToken) {
            const user = await models.user.findOne({ 
                where: {
                    email
                } 
            })
    
            encryptedUserPassword = await bcrypt.hash(password, 10)
    
            user.password = encryptedUserPassword
    
            await user.save()
            return res.status(200).send("Reset was sucessfull")
        } else {
            return res.status(400).send("Token expired")
        }
    })
}