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
        let exercises
        db.Workout.findOne(
            { _id: id }, 
            function(err, data) {
                console.log(data)
            }
        )
        
        console.log(exercises)
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


