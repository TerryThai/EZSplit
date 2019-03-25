const mongoose = require('mongoose')
const Schema = mongoose.Schema

const receiptSchema = new Schema({
  date: {type: Date, default: Date.now},
  groupId: String,
  data: Array,
  uploader: Object,
  calc: {type: Array, default: [{Name: 'Henry', Payee: 'Terry', Amount: 500}]},
  img: {name: String, data: Buffer, contentType: String}
})
const Receipt = mongoose.model('Receipt', receiptSchema)
module.exports = Receipt
