const express = require('express')
const router = express.Router()

const {getAllUpcoming,getAllOverdue,getOne,add,update,remove} =  require('../controllers/todo.controller')

router.get('/upcoming',getAllUpcoming)
router.get('/overdue',getAllOverdue)
router.get('/:id',getOne)
router.post('/add',add)
router.put('/update/:id',update)
router.delete('/delete/:id',remove)

module.exports = router