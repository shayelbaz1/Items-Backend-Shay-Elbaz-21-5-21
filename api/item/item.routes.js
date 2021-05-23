const express = require('express')
// const { requireAuth, requireAdmin, requireCreator } = require('../../middlewares/requireAuth.middleware')
const { getItem, getItems, deleteItem, updateItem, addItem, getAmount } = require('./item.controller')
const router = express.Router()


router.get('/amount', getAmount)
router.get('/', getItems)
router.get('/:id', getItem)
router.post('/', addItem)
router.put('/:id', updateItem)
router.delete('/:id', deleteItem)

module.exports = router