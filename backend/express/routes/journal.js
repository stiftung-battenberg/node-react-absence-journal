const { models } = require('../../database')
const auth = require("../middleware/auth")

require("dotenv").config();

module.exports = (app) => {

    app.get("/api/user/:id/journal", auth.verifyToken, async (req, res) =>{
        const user = await models.user.findOne({ 
            where: {
                id: req.user,
            } 
        })

        if(req.user == req.params.id || user.isAdmin ) {

            const Journal = await models.journal.findAll({
                include:  'validatedBy',
                where: {
                    userId: req.params.id
                }
            })
            return res.status(200).json(Journal)
        }
        return res.status(403).send()
        
    })
}
