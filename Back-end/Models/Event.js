const mongoose = require('mongoose');


const eventSchema = new mongoose.Schema({
    Event_ID: {
        type: mongoose.Schema.Types.ObjectId,  
        default: () => new mongoose.Types.ObjectId(),
    },
    Level: {
        type: String,
        enum: ['Beginner', 'Intermediate', 'Advanced'],  
        required: true,
    },
    Topic: {
        type: String,
        required: true,
        trim: true,
    },
    Start_Time: {
        type: Date,
        required: true,
    },
    End_Time: {
        type: Date,
        required: true,
    }
}, { timestamps: true });  


const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
