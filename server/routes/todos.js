const express = require('express')
const router = express.Router()

const {getAll,getOne,add,update,remove} =  require('../controllers/todo.controller')

router.get('/',getAll)
router.get('/:id',getOne)
router.post('/add',add)
router.put('/update/:id',update)
router.delete('/delete/:id',remove)

module.exports = router