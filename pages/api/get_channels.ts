import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import { v4 } from 'uuid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const { user, channelLength } = JSON.parse( req.body )

    const data = await prisma.channel.findMany( {
        where: {
            user: {
                some: { id: user.id }
            }
        }, 
        include: { message: {
            orderBy: {
                sentAt: 'desc'
            }, 
            take: 10
        } }
    } )

    data ? res.json( data ) :
    res.json( { mesage: 'error' } )
}
