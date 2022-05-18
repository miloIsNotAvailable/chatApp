import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import jwt from "jsonwebtoken"
import { User } from '@prisma/client'
import { serialize } from 'cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    // set a session cookie and store jwt data there
    res.setHeader( "Set-Cookie",
        serialize( "sessionToken", req.body, {
            path: "/",
            sameSite: "lax",
            expires: new Date
        } )
    )

    const e = req.cookies

    res.json( e )
}
