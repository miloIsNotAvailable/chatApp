import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const { name } = JSON.parse( req.body )

    const user = await prisma.user.findMany( {
        where: {
          name: {
            contains: name
          }
        }
    } )

  if( name.length > 0 ) res.json( user )
  if( name.length == 0 ) res.json( null )
}
