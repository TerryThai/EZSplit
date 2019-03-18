const router = require('express').Router()
const unirest = require('unirest')
module.exports = router

router.post('/send', async (req, res, next) => {
  try {
    const file = req.files.file

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
