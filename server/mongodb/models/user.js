const mongoose = require('mongoose')
const Schema = mongoose.Schema

// balance array item would include person who owes balance
const userSchema = new Schema({
  email: String,
  name: String,
  friends: [{name: String, email: String}],
  receipts: [{type: Array}],
  balance: [{name: String, balance: Number}]
})
const MongoUser = mongoose.model('User', userSchema)
module.exports = MongoUser
