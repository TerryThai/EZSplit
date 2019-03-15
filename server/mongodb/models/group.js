const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema({
  name: String,
  users: [],
  receipts: []
})
const Group = mongoose.model('Group', groupSchema)
module.exports = Group
