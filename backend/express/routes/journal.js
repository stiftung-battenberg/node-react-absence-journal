const { models } = require('../../database')
const auth = require("../middleware/auth")
const moment = require('moment');

require("dotenv").config();

module.exports = (app) => {

    app.get("/api/user/:id/journalweek", auth.verifyToken, async (req, res) =>{
        const user = await models.user.findOne({ 
            where: {
                id: req.user,
            }
        })

        if(req.user == req.params.id || user.isAdmin ) {

            const Journal = await models.journalweek.findAll({
                include:  'validatedBy',
                where: {
                    userId: req.params.id
                },
                order :[
                    ['weekNumber']
                ] 
            })
            return res.status(200).json(Journal)
        }
        return res.status(403).send()
        
    })

    app.post("/api/user/:id/journalweek", auth.verifyToken, async (req, res) => {
        const user = await models.user.findOne({ 
            where: {
                id: req.user,
            } 
        })

        if(req.user == req.params.id || user.isAdmin ) {
            const { date } = req.body

            const weekForUserAlreadyExist = await models.journalweek.findOne({
                where : {
                    weekNumber: moment(date,  "YYYYMMDD").week(),
                    userId: req.params.id
                }
            })

            if(weekForUserAlreadyExist) {
                return res.status(400).send("Week number already in use !!")
            }

            const journalweek = await models.journalweek.create({
                weekNumber: moment(date,  "YYYYMMDD").week(),
                start: moment(date,  "YYYYMMDD").startOf('week').add(1, 'day'), 
                finish: moment(date,  "YYYYMMDD").endOf('week').subtract(1, 'day'),
                userId: req.params.id
            })

            for(var i = 0; i <= 4; i++) {
                await models.journal.create({
                    date: moment(journalweek.start).add(i, 'day'),
                    journalweekId: journalweek.id
                })
            }
            
            return res.status(200).json(journalweek)
        }
        return res.status(403).send()
    })

    app.get("/api/journalweeks", auth.verifyToken, auth.isAdmin, async (req, res) => {
        const Journal = await models.journalweek.findAll({
            include:  'user_journal',
            where: {
                validated: false
            },
            order :[
                ['weekNumber']
            ] 
        })
        return res.status(200).json(Journal)
    }) 

    app.delete("/api/journalweek/:id/",  auth.verifyToken, async (req, res ) => {
        const user = await models.user.findOne({ 
            where: {
                id: req.user,
            } 
        })
        const journalweek = await models.journalweek.findOne( {
            where : {
                id: req.params.id
            }
        })
        if(req.user == journalweek.userId || user.isAdmin ) {
            journalweek.destroy()
            return res.status(200).json()
        }
        return res.status(403).send()
    })
    app.put("/api/journalweek/:id/validate",  auth.verifyToken, auth.isAdmin, async (req, res ) => {
        await models.journalweek.update({ validated: true, validatedById: req.user}, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).send()
    }) 

    app.get("/api/journalweek/:id/journal", auth.verifyToken, async (req, res) => {
        const user = await models.user.findOne({ 
            where: {
                id: req.user,
            } 
        })
        const journalweek = await models.journalweek.findOne({
            where: {
                id: req.params.id
            },
            include: models.journal
        })
        if(req.user == journalweek.userId || user.isAdmin ) {
            res.status(200).send(journalweek.journals) 
        }
        return res.status(403).send()
    })

    app.get("/api/journalweek/:id", auth.verifyToken, async (req, res) => {
        const user = await models.user.findOne({ 
            where: {
                id: req.user,
            } 
        })
        
        const journalweek = await models.journalweek.findOne({
            where: {
                id: req.params.id
            },
            include: models.journal
        })
        if(req.user == journalweek.userId || user.isAdmin ) {
            res.status(200).send(journalweek) 
        }
        return res.status(403).send()
    })

    app.put("/api/journal/:id", auth.verifyToken, async (req, res) => {
        const { comment , activity } = req.body

        const journal = await models.journal.update({activity, comment}, {
            where: {
                id: req.params.id
            }
        })

        res.status(200).send()
    })
}
