module.exports = io => {
  io.on('connection', socket => {
    // console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('cell-update', table => {
      // console.log('======TABLE===>', table)
      socket.broadcast.emit('cell-update', table)
    })

    socket.on('disconnect', () => {
      // console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
