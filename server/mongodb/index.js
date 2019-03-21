const mongoose = require('mongoose')
const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ezsplit'
mongoose.connect(mongoURI, {
  useNewUrlParser: true
})

var db = mongoose.connection
require('./models/user')
require('./models/group')
require('./models/receipt')

module.exports = db
