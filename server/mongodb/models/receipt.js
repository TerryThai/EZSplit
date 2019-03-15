const mongoose = require('mongoose')
const Schema = mongoose.Schema

const receiptSchema = new Schema({
  date: {type: Date, default: Date.now},
  groupId: Number,
  data: Array,
  calc: Array,
  img: {name: String, data: Buffer, contentType: String}
})
const Receipt = mongoose.model('Receipt', receiptSchema)
module.exports = Receipt
