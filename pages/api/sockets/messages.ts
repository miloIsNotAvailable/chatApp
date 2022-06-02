import { NextApiRequest, NextApiResponse } from 'next'
import { fromEvent, map, mergeMap, Observable, of, switchMap } from 'rxjs'
import { Server, Socket } from 'socket.io'
import { DefaultEventsMap } from 'socket.io/dist/typed-events'
import { v4 } from 'uuid'
import { callUserTypes } from '../../../Components/interfaces/webRTCInterfaces'
import { prisma } from '../../../lib/prisma'

type IOObservable = Observable<Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>> 
type ConnectObs = Observable<{
  io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>;
  // :3
  client: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any> | any
}>

type MsgType = {
  channelID: string,
  from: string,
  content: string,
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
    
    connect.pipe( 
      mergeMap( 
        ( { client } )  => fromEvent( client, 'new-channel' )
        .pipe( map( data => ( { client, data } ) ) ) 
      )
     )
     .subscribe( ( { client, data }: any ) => {
        io.to( data?.id ).emit( 'created-channel', data )
     } )

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
    ).subscribe( ( { channelID, content, from }: MsgType ) => {
      
      (async() => {
        
        const postID = v4()

        io.emit( 'new-pm', { channelID, content, from, messageID: postID } )
        const data = { channelID, content, from }

        return { data, postID }
      })().then( async( { data, postID } ) => {

        console.log( data.channelID )

        await prisma.message.create( {
          data: {
            content: data.content,
            from: data.from,
            messageID: postID,
            channel: { 
              connect: {
                id: data.channelID
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

    connect.pipe(
      mergeMap( 
          ( { client } ) => fromEvent( client, 'call-started' )
          .pipe( 
              data=> data
          )
      )
    ).subscribe( ( data: any ) => {
        io.to( data.channelID ).emit( 'call-from-user', data )
      } )

    connect.pipe(
      mergeMap( 
          ( { client } ) => fromEvent( client, 'call-answered' )
          .pipe( 
              data=> data
          )
      )
    ).subscribe( ( data: any ) => {
        io.to( data.channelID ).emit( 'user-call-answered', data )
      } )

    connect.pipe(
      mergeMap( 
          ( { client } ) => fromEvent( client, 'offer-candidate' )
          .pipe( 
              data=> data
          )
      )
    ).subscribe( ( data: any ) => {
        io.to( data.channelID ).emit( 'get-offer-candidates', data )
      } )

    connect.pipe(
      mergeMap( 
          ( { client } ) => fromEvent( client, 'answer-candidate' )
          .pipe( 
              data=> data
          )
      )
    ).subscribe( ( data: any ) => {
        console.log( data )
        io.to( data.channelID ).emit( 'get-answer-candidates', data )
      } )

    connect.pipe(
      mergeMap( 
          ( { client } ) => fromEvent( client, 'call-ended' )
          .pipe( 
              data => data
          )
      )
    ).subscribe( ( data: any ) => {
        console.log( data )
        io.to( data.channelID ).emit( 'get-call-ended', data )
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