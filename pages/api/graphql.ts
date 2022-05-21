import { ApolloServer } from 'apollo-server-micro'
import { typeDefs, resolvers } from '../../graphql'
import Cors from 'micro-cors'
import { makeExecutableSchema } from '@graphql-tools/schema'
import { Disposable } from 'graphql-ws'
import { WebSocketServer } from 'ws'
import { useServer } from 'graphql-ws/lib/use/ws'

/**
 * in case you get an error 
 * about invalid import
 * change the import to whatever the 
 * error tells you in graphql/lib/server.mjs
 * and every index.mjs file in @graphql-tools  
 */

const cors = Cors()
const schema = makeExecutableSchema( { typeDefs, resolvers } )

let serverCleanup: Disposable | null = null;

const apolloServer = new ApolloServer({
    schema,
    plugins: [
      // Proper shutdown for the WebSocket server.
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup?.dispose();
            },
          };
        },
      },
    ]
  });

const getHandler = async () => {
    await startServer;
    return apolloServer.createHandler({
        path: '/api/graphql',
    });
}

const startServer = apolloServer.start()

const wsServer = new WebSocketServer({
    noServer: true
  });

// ill fix those types later
export default cors( async function handler ( 
    req: any, 
    res: any 
) {    
    if( req.method === "OPTIONS" ) {
        res.end()
        return false
    }

    res.socket.server.ws ||= (() => {
        res.socket.server.on('upgrade', function (request: any, socket: any, head: any) {
          wsServer.handleUpgrade(request, socket, head, function (ws) {
            wsServer.emit('connection', ws);
          })
        })
        serverCleanup = useServer({ schema }, wsServer);
        return wsServer;
      })();
    
      const h = await getHandler();
    
      await h(req, res)
} )

export const config = {
    api: { bodyParser: false }
}
