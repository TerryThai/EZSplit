const Mailer = require('../email/Mailer')
const balanceTemplate = require('../email/template')
const linkTemplate = require('../email/sendLinkTemplate')
const router = require('express').Router()
module.exports = router

// send email with balances to people - api/email/balances
router.post('/sendUserAmounts', async (req, res, next) => {
  const {uploader, groupName, userAmounts, date, recipients} = req.body
  console.log('req.body', req.body)
  // let balance = {
  //   subject: `${uploader} has shared the IOU's for your recent meal`,
  //   body: 'You owe $200 to XZZ',
  //   recipients: [
  //     // recipients.split(',').map(email => ({email: email.trim()}))
  //     {email: 'aman_thapar@hotmail.com'},
  //     {email: 'henryzheng92@gmail.com'},
  //     {email: 'Terencethai@gmail.com'},
  //     {email: 'yuva.chang@gmail.com'}
  //   ],
  //   dateSent: Date.now(),
  //   user: {}
  // }
  // const mailer = new Mailer(balance, balanceTemplate(balance))
  // try {
  //   await mailer.send()
  //   res.json('ok')
  // } catch (err) {
  //   next(err)
  // }
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
