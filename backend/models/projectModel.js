const mongoose = require('mongoose');
let date = new Date();

const taskSchema = mongoose.Schema({
    users: {
        type: Array,
        required: true,
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
    startDate: {
        type: Date,
        default: date.setHours(0,0,0,0),
        required: [true, 'Please add a start date']
    },
    endDate: {
        type: Date,
        required: [true, 'Please add an end date']
    }
}, 
{
    timestamps: true,
})

const sectionSchema = mongoose.Schema({
    users: {
        type: Array,
        required: true,
    },
    tasks: [taskSchema], 
    text: {
        type: String,
        required: [true, 'Please add a section name']
    }
}, 
{
    timestamps: true,
})

const projectSchema = mongoose.Schema({
    users: {
        type: Array,
        required: true,
    },
    sections: [sectionSchema], 
    text: {
        type: String,
        required: [true, 'Please add a project name']
    }
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Project', projectSchema);