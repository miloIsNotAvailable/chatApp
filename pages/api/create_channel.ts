import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import { v4 } from 'uuid'
import { Channel } from '@prisma/client'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const { name } = JSON.parse(req.body)
    const createChannel: Channel | null = await prisma.channel.create( {
      data: {
        users: name,
        id: v4(),
        message: undefined
      }
    } )

    // if( createChannel ) res.json( createChannel )
    res.json( req.body )
}
