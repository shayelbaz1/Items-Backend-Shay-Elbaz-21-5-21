const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
  query,
  getById,
  remove,
  add,
  amount,
  update
}

async function update(item) {
  const collection = await dbService.getCollection('item')
  item._id = ObjectId(item._id)

  try {
    await collection.replaceOne({ _id: item._id }, { $set: item })
    return item
  } catch (err) {
    console.log(`ERROR: cannot update item ${item._id}`)
    throw err
  }
}

async function amount() {
  const collection = await dbService.getCollection('item')
  try {
    const count = await collection.countDocuments()
    return count
  } catch (err) {
    console.log(`ERROR: while finding item ${itemId}`)
    throw err
  }

}

async function query(filterBy) {
  const criteria = _buildCriteria(filterBy)

  // const limit = +filterBy.limit ? +filterBy.limit : 3
  // let page = +filterBy.page ? +filterBy.page : 1

  const collection = await dbService.getCollection('item')
  try {
    // const items = await collection.find(criteria).skip((page - 1) * limit).limit(limit).toArray()
    const items = await collection.find(criteria).toArray()
    return items
  } catch (err) {
    console.log('err:', err)
    console.log('ERROR: cannot find items')
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}

  if (filterBy.txt) {
    criteria.txt = { $regex: new RegExp(filterBy.txt, 'i') }
  }
  return criteria
}

async function getById(itemId) {
  const collection = await dbService.getCollection('item')
  try {
    const item = await collection.findOne({ _id: ObjectId(itemId) })
    return item
  } catch (err) {
    console.log(`ERROR: while finding item ${itemId}`)
    throw err
  }
}

async function remove(itemId) {
  const collection = await dbService.getCollection('item')
  try {
    await collection.deleteOne({ _id: ObjectId(itemId) })
  } catch (err) {
    console.log(`ERROR: cannot remove item ${itemId}`)
    throw err
  }
}

async function add(item) {
  const collection = await dbService.getCollection('item')
  item.deliveryEST = new Date(item.deliveryEST)
  item.createdAt = new Date(item.createdAt)
  try {
    await collection.insertOne(item)
    return item
  } catch (err) {
    console.log(`ERROR: cannot insert item`)
    throw err
  }
}