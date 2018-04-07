const mongoose = require('mongoose')
const validate = require('mongoose-validator');
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')

const todoSchema = new Schema({
    task : {
        type : String,
    },
    status : {
        type : Boolean,
    },
    datetask : {
        type : Date,
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
