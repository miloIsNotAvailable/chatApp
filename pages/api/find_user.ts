import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    console.log( req.body )
    const result = await JSON.parse( req.body )
    const { name, currUser } = result

    const user = await prisma.user.findMany( {
        where: {
          name: {
            contains: name
          },
          NOT: {
            name: currUser
          }
        }
    } )

  name.length > 0 ? res.json( user ) : res.json( null )
}
