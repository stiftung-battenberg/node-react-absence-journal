const { models } = require('../../database')
const auth = require("../middleware/auth")

require("dotenv").config();

module.exports = (app) => {

    app.get("/api/user/:id/absence", auth.verifyToken, async (req, res) => {
        const absences = await models.absence.findAll({
            where: {
                validated: false
            }
        });
        res.status(200).json(absences)
    })

    app.post("/api/user/:id/absence", auth.verifyToken, async (req, res) => {
        const {from, to, motif, comment} = req.body

        if(! (from && to && motif && comment)) {
            return res.status(400).send("All fields are required !!")
        }

        await models.absence.create({
            from, 
            to,
            motif,
            comment,
            userId: req.params.id 
        })
    })
}
