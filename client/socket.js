import io from 'socket.io-client'
import store, {getReceipt} from '../client/store/index'

const socket = io(window.location.origin)

socket.on('connect', () => {
  console.log('Connected!')
})

socket.on('cell-update', table => {
  console.log(table, 'in sockets file')
  // store.dispatch(getReceipt(table))
})

export default socket

// put this in thunk
// socket.emit('cell-update', receipt);
