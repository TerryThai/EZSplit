module.exports = io => {
  io.on('connection', socket => {
    console.log(`A socket connection to the server has been made: ${socket.id}`)

    socket.on('cell-update', tableData => {
      socket.broadcast.emit('cell-update', tableData)
    })

    socket.on('cell-lock', lockStatus => {
      socket.broadcast.emit('lockChange', lockStatus)
    })

    socket.on('userAmounts', userAmounts => {
      socket.broadcast.emit('updateUserAmounts', userAmounts)
    })
    socket.on('deleteRow', () => {
      socket.broadcast.emit('rowDeleted')
    })
    socket.on('disconnect', () => {
      console.log(`Connection ${socket.id} has left the building`)
    })
  })
}
