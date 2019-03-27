const Mailer = require('../email/Mailer')
const balanceTemplate = require('../email/userAmountsEmail')
const linkTemplate = require('../email/sendLinkTemplate')
const router = require('express').Router()
module.exports = router

// send email with balances to people - api/email/balances
router.post('/sendUserAmounts', async (req, res, next) => {
  const {
    receiptId,
    uploader,
    groupName,
    userAmounts,
    date,
    recipients,
    payers
  } = req.body

  let email = {
    subject: `${uploader.name} has shared the IOU's for your recent meal`,
    body: 'Please see below IOUs:',
    recipients,
    groupName,
    receiptId,
    payers
  }
  const mailer = new Mailer(email, balanceTemplate(email))
  try {
    await mailer.send()
    res.json('ok')
  } catch (err) {
    next(err)
  }
})

router.post('/send', async (req, res, next) => {
  const {receiptId, uploader, recipients} = req.body
  let email = {
    subject: `${uploader} has invited to you join this table`,
    body: `Please click on the following link to join the board:`,
    recipients,
    receiptId
  }
  const mailer = new Mailer(email, linkTemplate(email))
  try {
    await mailer.send()
    res.sendStatus(200)
  } catch (err) {
    next(err)
  }
})
