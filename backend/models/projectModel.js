const mongoose = require('mongoose');

const projectSchema = mongoose.Schema({
    users: {
        type: Array,
        required: true,
        ref: 'User'
    },
    sections: {
        type: Array,
        required: [true, 'Please add a text value']
    }, 
    text: {
        type: String,
        required: [true, 'Please add a project name']
    }
}, 
{
    timestamps: true,
})

module.exports = mongoose.model('Project', projectSchema);