const express = require('express')
const router = express.Router()
const dataControlller = require('../controller/controller')
const authController = require('../controller/authController')
// view
router.get('/home', dataControlller.getAllData)
router.get('/GetBy/class', dataControlller.getDatabyClass)
// add
router.post('/add/data/mahasiswa', dataControlller.adddata)
// upodate
router.put('/update/data/mahasiswa', dataControlller.updateData)
// delete
router.delete('/delete/user/mahasiswa',dataControlller.deleteData)

router.post('/login', authController.login)
router.post('/register', authController.register)
router.get('/user/data', authController.getUser)

module.exports = router
