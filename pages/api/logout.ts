import type { NextApiRequest, NextApiResponse } from 'next'
import { serialize } from 'cookie'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    /**
     * @param req.body is basically the encoded jwt
     * token
     * 
     * --------------------------------------------
     * fetch data ( current encoded jwt token  ) then 
     * update the cookie to have expiration date of 0, 
     * clearing it and thus logging out
     */
    
    res.setHeader( "Set-Cookie",
        serialize( "sessionToken", req.body, {
            path: "/",
            sameSite: "lax",
            expires: new Date
        } )
    )

    const e = req.cookies

    res.json( e )
}
