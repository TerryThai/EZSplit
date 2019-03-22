const router = require('express').Router()
const MongoUser = require('../mongodb/models/user')
const MongoGroup = require('../mongodb/models/group')
const {User} = require('../db/models/index')
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
  } catch (error) {
    next(error)
  }
})

// add a friend manually to user.friends
router.put('/quickadd', async (req, res, next) => {
  try {
    myEmail = req.body.myEmail
    friendEmail = req.body.friendEmail
    friendName = req.body.friendName
    console.log(friendName, friendEmail)
    newFriend = {name: friendName, email: friendEmail}
    await MongoUser.findOneAndUpdate(
      {email: myEmail},
      {$push: {friends: newFriend}}
    )
    console.log('NEWFRIEND!!!!!!!!', newFriend)
    res.json(newFriend)
  } catch (error) {
    next(error)
  }
})

// add a friend to user.friends
router.put('/add', async (req, res, next) => {
  try {
    console.log('hit add')
    let newFriend
    let myEmail = req.body.myEmail
    let friendEmail = req.body.friendEmail

    let friend = await MongoUser.findOne({email: friendEmail})

    if (friend === null) {
      let seqFriend = await User.findOne({where: {email: friendEmail}})

      if (seqFriend === null) {
        newFriend = {error: 'User not found'}
      } else {
        newFriend = {name: seqFriend.name, email: seqFriend.email}
      }
    } else {
      newFriend = {name: friend.name, email: friend.email}
    }

    if (newFriend.name) {
      await MongoUser.findOneAndUpdate(
        {email: myEmail},
        {$push: {friends: newFriend}}
      )
    }
    res.json(newFriend)
  } catch (error) {
    next(error)
  }
})

// remove a friend from user.friends
router.delete('/:email/:myEmail', async (req, res, next) => {
  try {
    const email = req.params.email
    const myEmail = req.params.myEmail
    await MongoUser.findOneAndUpdate(
      {email: myEmail},
      {$pull: {friends: {email}}}
    )
    res.status(204)
  } catch (error) {
    next(error)
  }
})
