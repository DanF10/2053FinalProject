const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    users: {
        type: Array,
        required: true,
        ref: 'User'
    },
    text: {
        type: String,
        required: [true, 'Please add a text value']
    },
    startDate: {
        type: String,
        default: new Date().toLocaleString().split(',')[0],
        required: [true, 'Please add a start date']
    },
    endDate: {
        type: String,
        default: 'Please fix later',
        required: [true, 'Please add a end date']
    }
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Task', taskSchema);