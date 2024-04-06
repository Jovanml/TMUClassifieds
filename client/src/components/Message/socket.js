import { io } from 'socket.io-client'

//create the connection to the backend websocket
export const socket = io(process.env.REACT_APP_WEBSOCKET_URL);