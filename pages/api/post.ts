import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import jwt from "jsonwebtoken"
import { User } from '@prisma/client'
import { serialize } from 'cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    // fetch email from the form first
    const { getEmail } = JSON.parse( req.body )

    // find a user by their email
    // I'll make it so it checks the password later 
    const user: User | null = await prisma.user.findUnique( {
        where: {
            email: getEmail.email, 
        }
    } )

    if( !user ) return res.json( { error: "user not found" } )

    // yes ill move this to .env later
    const KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"

    /** if user exists create 
     * @param sessionToken 
     * encoded jwt that stores
     *  @example user: { 
     *      email: string,
     *      id: string,
     *      username: string, 
     *      createdAtcreationDate: string 
     *      updatedAt: string 
     *  } 
    */ 

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

    const e = req.cookies

    res.json( e )
}
