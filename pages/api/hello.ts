// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
// import prisma from '../../lib/prisma'

type Data = {
  name: any
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.json({ name: "John Doe" })
}
