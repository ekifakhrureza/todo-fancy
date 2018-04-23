const mongoose = require('mongoose')
const validate = require('mongoose-validator');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const todoSchema = new Schema({
    task : {
        type : String,
        required : [true,'task cannot be empty'],
    },
    status : {
        type : Boolean,
    },
    datetask : {
        type : String,
        required : [true,'task cannot be empty'],
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true
})

let Todo = mongoose.model('Todos', todoSchema)

module.exports = Todo
