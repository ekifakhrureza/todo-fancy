const Todo = require('../models/todo.model')
const jwt = require('jsonwebtoken')

module.exports = {
  getAllUpcoming: function (req, res) {
    console.log('asupp euyyy');
    
    Todo.find({
      user: req.decoded.id,
      status: false
    })
      .exec()
      .then(response => {
        res.status(200).json({
          message: 'success get data',
          data: response
        })
      }).catch(err => {
        res.status(500).json({
          message: 'get data failed',
          err
        })
      })
  },
  getAllOverdue: function (req, res) {

    Todo.find({
      user: req.decoded.id,
      status: true
    })
      .exec()
      .then(response => {
        res.status(200).json({
          message: 'success get data',
          data: response
        })
      }).catch(err => {
        res.status(500).json({
          message: 'get data failed',
          err
        })
      })
  },

  getOne: function (req, res) {
    Todo.findById(req.params.id).exec().then(response => {
      res.status(200).json({
        message: 'success get data by id',
        data: response
      })
    }).catch(err => {
      res.status(500).json({
        message: 'get data by id failed',
        err
      })
    })
  },

  add: function (req, res) {
    console.log('asasa');
    let today = new Date().toISOString().slice(0, 10)
    let parseDateNow = Date.parse(today)
    let stringTemp = req.body.datetask
    let convertDate = Date.parse(stringTemp)
    if(parseDateNow<=convertDate){
      status=false
    }
    else{
      status=true
    }

    let newTodo = new Todo({
      task: req.body.task,
      status: status,
      datetask: req.body.datetask,
      user: req.decoded.id
    })

    newTodo.save().then(response => {
      res.status(200).json({
        message: 'success insert data',
        data: response
      })
    }).catch(err => {
      res.status(500).json({
        message: 'insert error',
        err
      })
    })
  },


  remove: function (req, res) {
    Todo.findByIdAndRemove(req.params.id).then(response => {
      res.status(200).json({
        message: 'delete success',
        data: response
      })
    }).catch(err => {
      res.status(500).json({
        message: 'delete error',
        err
      })
    })
  },

  update: function (req, res) {
    Todo.update({ _id: req.params.id }, {
      task: req.body.task,
      status: req.body.status,
      datetask: req.body.datetask,
    }).then(response => {
      res.status(200).json({
        message: 'update success',
        data: response
      })
    }).catch(err => {
      res.status(500).json({
        message: 'update error',
        err
      })
    })

  }

}