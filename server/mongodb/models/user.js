const mongoose = require('mongoose')
const Schema = mongoose.Schema

// balance array item would include person who owes balance
const userSchema = new Schema({
  email: String,
  name: String,
  groups: Array,
  receipts: Array,
  balance: [{name: String, balance: Number}]
})
const User = mongoose.model('User', userSchema)
module.exports = User
