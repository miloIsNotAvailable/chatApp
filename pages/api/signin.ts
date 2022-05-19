import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import jwt from "jsonwebtoken"
import { User } from '@prisma/client'
import { serialize } from 'cookie'
import { v4 as uuidv4 } from 'uuid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    // fetch data from the form first
    const { 
        getEmail, 
        getUsername, 
        getPassword 
    } = JSON.parse( req.body )

    // find a user by their email
    // I'll make it so it checks the password later 
    const user: User | null = await prisma.user.create( {
        data: {
            email: getEmail.email,
            id: uuidv4(), 
            name: getUsername.username
        }
    } )

    if( !user ) return res.json( { error: "user not found" } )

    // yes ill move this to .env later
    const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9" 

    const sessionToken = {
        token: jwt.sign( {
            user: user
        }, KEY )
    } 

    // set a session cookie and store jwt data there
    res.setHeader( "Set-Cookie",
        serialize( "sessionToken", sessionToken.token, {
            path: "/",
            sameSite: "lax"
        } )
    )

    res.json( user )
}
