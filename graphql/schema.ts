import { gql } from "apollo-server-core";

export const typeDefs = gql`
    type User {
        email: String
        id: String
        name: String
        createdAt: String
        updatedAt: String
    }

    type createMessage {
        id: String
        content: String!
        from: String
        channel: String
    }

    type messageSubscription {
        id: String
        content: String!
        from: String
        channel: String
    }

    type Query {
        users: [ User ]
    }

    type Mutation {
        message( 
            id: String, 
            content: String,
            from: String, 
            channel: String  
        ): createMessage
    }

    type Subscription {
        updateMessages: messageSubscription
    }
`