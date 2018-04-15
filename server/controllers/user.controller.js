const User = require('../models/user.model')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
// const saltRounds = 10
// const salt = bcrypt.genSaltSync(saltRounds)

module.exports = {
  register: function (req, res) {
    User.findOne({
      email: req.body.email
    }).then(data => {
      if (data) {
        res.status(202).json({
          message: 'Email Already Exist'
        })
      }
      else {
        res.status(200).json({
          message: 'Email not found'
        })
      }
    }).catch(err => {
      console.log(err);

    })

    // let hash = bcrypt.hashSync(req.body.password,salt)
    let newUser = new User({
      email: req.body.email,
      name: req.body.name,
      password: req.body.password
    })
    newUser.save()
      .then(response => {

        res.status(200).json({
          message: 'register success',
          data: response
        })
      }).catch(err => {
        console.log('error kali');
        console.log(err);
        res.status(500).json({
          message: 'register failed',
          err
        })
      })
  },

  login: function (req, res) {
    console.log('masuk server');
    
    User.findOne({
      email: req.body.email
    }).then(data => {

      if (data) {
        var result = bcrypt.compareSync(req.body.password, data.password);
        if (result) {
          let payload = {
            id: data.id,
            email: data.email,
            name: data.name,
          }
          let token = jwt.sign(payload, process.env.SECRETKEY)
          res.status(200).json({
            message: 'login success',
            id: data.id,
            email: data.email,
            name: data.name, 
            token: token,
          })
          //   console.log(process.env.SECRETKEY+' ini secrfet');

        } else {
          res.status(202).json({
            message: 'Wrong Username / Password'
          })
        }
      } else {
        res.status(202).json({
          message: 'Wrong Username / Password'
        })
      }
    }).catch(err => {
      console.log(err);

      res.status(500).json({
        message: 'Sign in failed'
      })
    })

  }
}