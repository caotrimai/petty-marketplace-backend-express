const {Server} = require('socket.io')

class SocketHandler {
  constructor (httpServer) {
    this.io = new Server(httpServer, {
      cors: {
        origin: process.env.CLIENT_DOMAIN,
      },
    })
  }

  getSocket () {
    return this.io
  }

  listenEvents () {
    this.io.on('connection', (socket) => {
        console.log('a user connected')

        socket.on('disconnect', () => {
          console.log('user disconnected')
        })
      },
    )
  }
}

 class ServerSocket {
   socket = null
   socketHandler = null
    
    setServer(httpServer) {
      this.socketHandler = new SocketHandler(httpServer)
      this.socketHandler.listenEvents()
      this.socket = this.socketHandler.getSocket()
    }
    
    getSocket () {
      return this.socket
    }
 }
 
 const serverSocket = new ServerSocket()
 
module.exports = serverSocket