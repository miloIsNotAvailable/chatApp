import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import { v4 } from 'uuid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const { msgsLength, channel } = JSON.parse( req.body )

    const data = await prisma.message.findMany( {
        where: { channelID: channel },
        skip: msgsLength,
        take: 4,
        orderBy: {
          sentAt: 'desc'
        }
    } )

    data ? res.json( data ) :
    res.json( { mesage: 'error' } )
}
