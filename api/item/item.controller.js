const ItemService = require('./item.service')
const logger = require('../../services/logger.service')


async function getAmount(req, res) {
    const amount = await ItemService.amount()
    logger.debug(amount);
    res.send("" + amount)
}

async function getItem(req, res) {
    const Item = await ItemService.getById(req.params.id)
    res.send(Item)
}

async function getItems(req, res) {
    const Items = await ItemService.query(req.query)
    logger.debug(Items);
    res.send(Items)
}

async function deleteItem(req, res) {
    await ItemService.remove(req.params.id)
    res.end()
}

async function updateItem(req, res) {
    const Item = req.body;
    await ItemService.update(Item)
    res.send(Item)
}

async function addItem(req, res) {
    const Item = req.body;
    await ItemService.add(Item)
    res.send(Item)
}

module.exports = {
    getItem,
    getItems,
    deleteItem,
    updateItem,
    addItem,
    getAmount
}