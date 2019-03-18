const router = require('express').Router()
const MongoUser = require('../mongodb/models/user')
const MongoGroup = require('../mongodb/models/group')
module.exports = router

//get all groups for user /api/groups/:email
router.get('/:email', async (req, res, next) => {
  try {
    const users = await MongoUser.find({
      email: req.params.email
    })
    console.log(users.groups)
    res.json(users.groups)
  } catch (err) {
    next(err)
  }
})

//create new group
router.post('/', async (req, res, next) => {
  try {
    const groupObj = req.body
    const group = await MongoGroup.create({
      groupObj
    })
    console.log(group)
    res.json(group)
  } catch (err) {
    next(err)
  }
})

//add friends to a group
router.put('/', async (req, res, next) => {
  try {
    const groupObj = req.body
    const group = await MongoGroup.create({
      groupObj
    })
    console.log(group)
    res.json(group)
  } catch (err) {
    next(err)
  }
})

// select group by id
router.get('/:id', async (req, res, next) => {
  try {
    const group = await MongoGroup.find({
      ObjectId: req.params.id
    })
    console.log(group)
    res.json(group)
  } catch (err) {
    next(err)
  }
})
