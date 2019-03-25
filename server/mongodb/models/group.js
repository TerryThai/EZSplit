const mongoose = require('mongoose')
const Schema = mongoose.Schema

const groupSchema = new Schema({
  name: String,
  users: [],
  receipts: []
})
const Group = mongoose.model('Group', groupSchema)
module.exports = Group

// // create some events
// const Groups = [
//   {
//     name: 'Basketball',
//     users: [
//       'amanthapar@gmail.com',
//       'athapar@seas.upenn.edu',
//       'aman@gtv.capital'
//     ]
//   },
//   {
//     name: 'Swimming',
//     users: ['amanthapar@gmail.com', 'aman@gtv.capital']
//   },
//   {
//     name: 'Weightlifting',
//     users: ['athapar@seas.upenn.edu']
//   },
//   {
//     name: 'Ping Pong',
//     users: [
//       'amanthapar@gmail.com',
//       'athapar@seas.upenn.edu',
//       'aman@gtv.capital'
//     ]
//   }
// ]
// Group.insertMany(Groups, function(err, x) {
//   if (err) console.log(err)
//   console.log(x)
// })
