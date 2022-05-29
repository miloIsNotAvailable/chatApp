import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import { v4 } from 'uuid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const newChannelId = v4()

    const { name, id } = JSON.parse(req.body)

    // create new channel
    const newChannel = await prisma.channel.create( {
      data: {
        id: newChannelId, 
        message: undefined, 
        users: name
      }
    } )

    /**
     * when its created assign it to users with
     * ids sent  in the body
     */
    newChannel && await prisma.channel.update( {
      where: { id: newChannel?.id },
      data: {
        user: { 
          connect: [ { id: id[0] }, { id: id[1] } ] 
        }
      }
    } ) 

    res.json( { id: newChannel?.id, users: name } )
}
