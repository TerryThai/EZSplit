const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/ezsplit', {
  useNewUrlParser: true
})

var db = mongoose.connection
require('./models/user')
require('./models/group')
require('./models/receipt')

module.exports = db
