import { PrismaClient } from "@prisma/client"
import { prisma } from "../lib/prisma"
import { messageArgs } from "./schemaTypes"
import { PubSub } from "graphql-subscriptions"

const pubsub = new PubSub()

export const resolvers = {
    Query: {
        users: async ( 
            _parent: any, 
            _args: any, 
            ctx: PrismaClient 
        ) => await prisma.user.findMany()
    }, 
    Mutation: {
        message: ( _parent: any, args: messageArgs ) => {

            pubsub.publish( "NEW_MESSAGE", {
                updateMessages: { ...args }
            } )

            return {
                ...args
            }
        }
    },

    Subscription: {
        updateMessages: {
            subscribe: () => pubsub.asyncIterator( [ "NEW_MESSAGE" ] )
        }
    }
}