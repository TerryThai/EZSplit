const router = require('express').Router()
const MongoUser = require('../mongodb/models/user')
const MongoGroup = require('../mongodb/models/group')
module.exports = router

// get all friends for current user
router.get('/all/:email', async (req, res, next) => {
  try {
    const friends = await MongoUser.findOne(
      {
        email: req.params.email
      },
      '-_id friends'
    )
    res.json(friends)
  } catch (err) {
    next(err)
  }
})

router.put('/add', async (req, res, next) => {
  try {
    myEmail = req.body.myEmail
    friendEmail = req.body.friendEmail
    let friend = await MongoUser.findOne({email: friendEmail})
    newFriend = {name: friend.name, email: friend.email}
    await MongoUser.findOneAndUpdate(
      {email: myEmail},
      {$push: {friends: newFriend}}
    )
    res.json(newFriend)
  } catch (error) {
    next(err)
  }
})

router.delete('/:email/myEmail', async (req, res, next) => {
  try {
    const email = req.params.email
    const myEmail = req.params.myEmail
    await MongoUser.findOneAndUpdate(
      {email: myEmail},
      {friends: {$pull: {email}}}
    )
    res.status(204)
  } catch (error) {
    next(err)
  }
})
