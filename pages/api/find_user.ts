import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const { name } = JSON.parse( req.body )

    const user = await prisma.user.findUnique( {
        where: {
          name: name
        }
    } )

  res.json( user )
}
