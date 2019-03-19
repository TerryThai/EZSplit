const router = require('express').Router()
const unirest = require('unirest')
const MongoReceipt = require('../mongodb/models/receipt')
module.exports = router

let uploadedReceipt

router.get('/:groupId', async (req, res, next) => {
  try {
    const receipts = await MongoReceipt.find({
      groupId: req.params.groupId
    })
    res.json({groupId: req.params.groupId, receipts})
  } catch (err) {
    next(err)
  }
})

router.post('/send', async (req, res, next) => {
  try {
    const file = req.files.file
    uploadedReceipt = file

    unirest
      .post('https://api.taggun.io/api/receipt/v1/verbose/encoded')
      .header({Accept: 'application/json'})
      .header({apikey: process.env.apikey})
      .header('Content-Type', 'application/json')
      .send({
        image: req.body.base64,
        filename: file.name,
        contentType: file.mimetype,
        refresh: false,
        incognito: false,
        language: 'en'
      })
      .end(function(result) {
        res.json(result.body)
      })
  } catch (error) {
    next(error)
  }
})

//Save Receipt
router.post('/save', async (req, res, next) => {
  try {
    const {table, groupId} = req.body
    const savedReceipt = await MongoReceipt.create({
      groupId,
      data: table,
      img: {
        name: uploadedReceipt.name,
        data: uploadedReceipt.data,
        contentType: uploadedReceipt.mimetype
      }
    })
    res.json(savedReceipt)
  } catch (err) {
    next(err)
  }
})
