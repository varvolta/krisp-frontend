import { io } from 'socket.io-client'
import { SOCKET_BASE_URL } from '../constants/socket'

const socket = io(SOCKET_BASE_URL)

socket.on('connect', () => console.log('Connected to socket server'))

export default socket