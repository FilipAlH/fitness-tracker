const db = require('../models')
const path = require('path')

module.exports = function(app) {
    app.get('/exercise', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/exercise.html'))
    })

    app.get('/stats', function(req, res) {
        res.sendFile(path.join(__dirname, '../public/stats.html'))
    })

    app.get('/api/workouts', function(req, res) {
        db.Workout.find({}).then(function(data) {
            res.json(data)
        })
    })

    app.put('/api/workouts/:id', function(req, res) {
        const id = req.params.id
        console.log(id)
        console.log(req.body)
        if(!id || !req.body.name || !req.body.duration) {
            res.json("no")
        } else {
            if(req.body.type === 'resistance') {

                let exercise = {
                    type: req.body.type,
                    name: req.body.name,
                    duration: req.body.duration,
                    weight: req.body.weight,
                    sets: req.body.sets,
                    reps: req.body.reps
                }

                db.Workout.updateOne(
                    { _id: id },
                    { $push: {exercises: exercise}})
                        .then((data) => res.json(data))
            } else {

                let exercise = {
                    type: req.body.type,
                    name: req.body.name,
                    duration : req.body.duration,
                    distance: req.body.distance
                }
                db.Workout.updateOne(
                    { _id: id },
                    { $push: {exercises: exercise}})
                        .then((data) => res.json(data))
            }
        }
    })        

    app.post('/api/workouts', function(req, res) {
        db.Workout.find({}).then(function(data) {
            res.json(data)
        })
    })

    app.get('/api/workouts/range', function(req, res) {
        db.Workout.find({}).then(function(data) {
            res.json(data)
        })
    })
}


