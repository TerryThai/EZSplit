const mongoose = require('mongoose')
const Schema = mongoose.Schema

const receiptSchema = new Schema(
  {
    date: {type: Date, default: Date.now},
    groupId: String,
    data: Array,
    uploader: Object,
    userAmounts: {type: Object, default: {}},
    img: {name: String, data: Buffer, contentType: String}
  },
  {minimize: false}
)
const Receipt = mongoose.model('Receipt', receiptSchema)
module.exports = Receipt
