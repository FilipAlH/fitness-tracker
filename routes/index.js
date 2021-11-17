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
        if(!id) {
            console.log('no')
        } else {
            if(req.body.type === 'resistance') {

                db.Workout.findOne(
                    { _id: id })
                        .then(data => {
                            console.log(data)
                            let exercise = [{
                            totalDuration : data.exercises[0].totalDuration + req.body.totalDuration,
                            weight : data.exercises[0].weight + req.body.weight,
                            sets : data.exercises[0].sets + req.body.sets,
                            reps : data.exercises[0].reps + req.body.reps
                            }]
                            console.log(exercise)

                            db.Workout.updateOne({ "_id": data._id }, { "$set": {
                                'exercises.$[].totalDuration' : exercise[0].totalDuration, 
                                'exercises.$[].weight' : exercise[0].weight,
                                'exercises.$[].sets' : exercise[0].sets,
                                'exercises.$[].reps' : exercise[0].reps,
                            }}, { "new": true })
                                .then((data) => res.json(data))
                        })
            } else {
                db.Workout.findOne(
                    { _id: id })
                    .then(data => {
                        console.log(data)
                        let exercise = [{
                        totalDuration : data.exercises[0].totalDuration + req.body.totalDuration,
                        distance: data.exercises[0].distance + req.body.distance
                        }]
                        console.log(exercise)

                        db.Workout.updateOne({ "_id": data._id }, 
                            { "$set": { 
                            'exercises.$[].duration' : exercise[0].totalDuration, 
                            'exercises.$[].distance' : exercise[0].distance,
                            }}, 
                            { "new": true })
                            .then((data) => res.json(data))
                    })
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


