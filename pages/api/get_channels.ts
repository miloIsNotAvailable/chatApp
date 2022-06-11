import type { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '../../lib/prisma'
import { v4 } from 'uuid'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const { user } = JSON.parse( req.body )

    console.log( user )

    const data = await prisma.channel.findMany( {
        where: {
            user: {
                some: { id: user.id }
            }
        }, 
        include: { 
            message: {
                orderBy: {
                    sentAt: 'desc'
                }, 
                take: 10
            }, 
            user: {
                where: {
                    id: {
                        not: {
                            equals: user?.id
                        }
                    }
                },
                select: { name: true }
            } 
        }
    } )

    data ? res.json( data ) :
    res.json( { mesage: 'error' } )
}
