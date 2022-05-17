import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const { email, password, username, id } = req.body

    // find a user by their email address
    const user = await prisma.user.create( {
        data: {
            email: email,
            id: id, 
            name: username
        }
    } )

    if( user ) res.json( { data: user } )
    if( !user ) res.json( { error: "user not found" } )
}
