const router = require('express').Router()
module.exports = router

router.use('/users', require('./users'))
router.use('/receipts', isAuthenticated, require('./receipts'))
router.use('/groups', isAuthenticated, require('./groups'))
router.use('/friends', isAuthenticated, require('./friends'))
router.use('/email', isAuthenticated, require('./email'))

function isAuthenticated(req, res, next) {
  if (req.user) {
    // if (req.user.isAdmin) {
    return next()
    // }
  } else {
    res.sendStatus(401)
  }
}
router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
