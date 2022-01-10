const { models } = require('../../database')
const auth = require("../middleware/auth")

require("dotenv").config();

module.exports = (app) => {

    app.get("/api/user/:id/absence", auth.verifyToken, async (req, res) => {
        const user = await models.user.findOne({ 
            where: {
                id: req.user,
            } 
        })

        if(req.user == req.params.id || user.isAdmin ) {

            const absences = await models.absence.findAll({
                include:  'validatedBy',
                where: {
                    userId: req.params.id
                }
            })
            return res.status(200).json(absences)
        }
        return res.status(403).send()
    })

    app.get("/api/absences", auth.verifyToken, auth.isAdmin, async (req, res) => {
        const absences = await models.absence.findAll({
            include:  'validatedBy',
            where: {
                validated: false
            }
        })

        return res.status(200).json(absences)
    })


    app.post("/api/user/:id/absence", auth.verifyToken, async (req, res) => {
        const {from, to, motif, comment} = req.body

        const user = await models.user.findOne({ 
            where: {
                id: req.user,
            } 
        })
        
        if(! (from && to && motif)) {
            return res.status(400).send("All fields are required !!")
        }
    
        if(req.user == req.params.id || user.isAdmin ) {
            await models.absence.create({
                from, 
                to,
                motif,
                comment,
                userId: req.params.id 
            })
            res.status(200).send()
        } else {
            res.status(403).send()
        }


    })

    app.put("/api/absence/:id", auth.verifyToken, async(req, res) =>{
        const { from, to, motif, comment } = req.body
        const user = await models.user.findOne({ 
            where: {
                id: req.user,
            } 
        })
        const absence = await models.absence.findOne({
            where: {
                id: req.params.id
            }
        })

        if((!absence.validated && req.user == absence.userId) || user.isAdmin ) {
            await models.absence.update({ from, to, motif, comment }, {
                where: {
                    id: req.params.id
                }
            })
            res.status(200).send()
        }
    })

    app.delete("/api/absence/:id", auth.verifyToken, auth.isAdmin, async(req, res) =>{
        await models.absence.destroy({
            where: {
              id: req.params.id
            }
        })
        res.status(200).send()
    })
    
    app.put("/api/absence/:id/validate", auth.verifyToken, auth.isAdmin, async(req, res) => {
        await models.absence.update({ validated: true, validatedById: req.user}, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).send()
    })
}
