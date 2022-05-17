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

// json lies the data gets posted here
// do not trust json 
if( user ) res.json( { data: user, error: undefined } )
if( !user ) res.json( { data: undefined, error: "user not found" } )
}
