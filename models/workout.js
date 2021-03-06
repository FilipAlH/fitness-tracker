const mongoose = require('mongoose');
const Schema = mongoose.Schema

const workoutSchema = new Schema({
    day: {type: Date, default: Date.now(), required:true},
    exercises: [{
        type: {type: String},
        name: {type: String},
        duration: {type: Number, default: 0, require: true},
        weight: {type: Number, default: 0, require: true},
        reps: {type: Number, default: 0, require: true},
        sets: {type: Number, default: 0, require: true},
        distance: {type: Number, default: 0, require: true}
    }]
});

const Workout = mongoose.model("Workout", workoutSchema)

module.exports = Workout