import { NextApiRequest, NextApiResponse } from 'next'
import { fromEvent, Observable, of } from 'rxjs'
import { Server } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'

type IOObservable = Observable<Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>> 

const ioHandler = (req: any, res: any) => {
  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io')

    const io = new Server(res.socket.server)

    io.on('connection', socket => {
      socket.broadcast.emit('a user connected')

      socket.on('message', (msg) => {
          io.emit( 'msg', { message: msg } )
          console.log( msg )
      })
    })

    res.socket.server.io = io
  } else {
    console.log('socket.io already running')
  }
  res.end()
}

export const config = {
  api: {
    bodyParser: false
  }
}

export default ioHandler