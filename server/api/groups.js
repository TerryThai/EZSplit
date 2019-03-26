const router = require('express').Router()
const MongoUser = require('../mongodb/models/user')
const MongoGroup = require('../mongodb/models/group')
module.exports = router

//get all groups for user /api/groups/:email
router.get('/:email', async (req, res, next) => {
  try {
    const email = req.params.email
    const groups = await MongoGroup.find({'users.email': email})
    res.json(groups)
  } catch (err) {
    next(err)
  }
})

// select group by id
router.get('/select/:id', async (req, res, next) => {
  try {
    const group = await MongoGroup.find({
      _id: req.params.id
    })
    res.json(group[0])
  } catch (err) {
    next(err)
  }
})

//create new group with friends
router.post('/', async (req, res, next) => {
  try {
    const {name, users} = req.body
    const group = await MongoGroup.create({
      name,
      users
    })
    res.json(group)
  } catch (err) {
    next(err)
  }
})

//leave group
router.put('/:groupId/:email', async (req, res, next) => {
  try {
    const {groupId, email} = req.params
    const group = await MongoGroup.findOneAndUpdate(
      {
        _id: groupId
      },
      {$pull: {users: {email}}},
      {new: true}
    )
    res.json(group._id)
  } catch (err) {
    next(err)
  }
})

//add friends to a group
// router.put('/', async (req, res, next) => {
//   try {
//     const groupObj = req.body
//     const group = await MongoGroup.create({
//       groupObj
//     })
//     console.log(group)
//     res.json(group)
//   } catch (err) {
//     next(err)
//   }
// })
