import { NextApiRequest, NextApiResponse } from 'next'
import { fromEvent, map, mergeMap, Observable, of, switchMap } from 'rxjs'
import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { v4 } from 'uuid'
import { prisma } from '../../../lib/prisma'

type IOObservable = Observable<Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>> 
type ConnectObs = Observable<{
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  // :3
  client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | any
}>

type MsgType = {
  room: string,
  from: string,
  msg: string,
}

const ioHandler = (req: any, res: any) => {

  const id = req.body

  if (!res.socket.server.io) {
    console.log('*First use, starting socket.io')

    const io = new Server(res.socket.server)

    // connect websockets
    const _io: IOObservable = of( io ) 
    const connect: ConnectObs = _io.pipe( 
      switchMap( ( io ) =>
        fromEvent( io, 'connection' ).pipe( 
          map( 
            ( client ) => ( { io, client } ) 
          )
        ) 
      )
    )
    
    // listen to sent messages
    const channel = connect.pipe( 
      mergeMap( ( { client } ) =>
        fromEvent( client, 'join-room' ).pipe(
          map(
            ( data ) => ({ data, client })
          )
        )
       ) 
    )

    channel.subscribe( ( { client, data }: any ) => {
      // console.log( data )
      // client.leave()
      client.join( data )
      io.to( data ).emit( 'hey', { room: data, payload: 'it works' } )
    } )

    // listen to sent messages
    const pm = connect.pipe( 
      mergeMap( ( { client } ) =>
        fromEvent( client, 'pm' ).pipe(
          map(
            ( data: any ) => data
          )
        )
       ) 
    ).subscribe( ( data: MsgType ) => {
      
      (async() => {
        
        const id = v4()

        io.emit( 'new-pm', { data, id } )
        
        return { data, id }
      })().then( async( { data, id } ) => {
        await prisma.message.create( {
          data: {
            content: data.msg,
            from: data.from,
            channel: { 
              connect: {
                id: data.room
              } 
            }
          }
        } )
        console.log( data )
      } )

    } )
  
    // listen to sent messages
    const msg = connect.pipe( 
      mergeMap( ( { client } ) =>
        fromEvent( client, 'message' ).pipe(
          map(
            ( data ) => data
          )
        )
       ) 
    )

    // send back a message
    msg.subscribe( v => {
      console.log( v )
      io.emit( 'msg', { message: v } )
    } )

    // listen to sent messages
    const isTyping = connect.pipe( 
      mergeMap( ( { client } ) =>
        fromEvent( client, 'is-typing' ).pipe(
          map(
            ( data ) => data
          )
        )
       ) 
    )

    // send back a message
    isTyping.subscribe( (data: any) => {
      // console.log( v )
      io.to( data?.channelID ).emit( 'user-is-typing', data )
    } )

    // io.on('connection', socket => {
    //   socket.broadcast.emit('a user connected')

    //   socket.on('message', (msg) => {
    //       io.emit( 'msg', { message: msg } )
    //   })
    // })

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