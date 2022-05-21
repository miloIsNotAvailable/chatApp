import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../lib/prisma";

type Context = {
    prisma: PrismaClient
}

export default async function createContext( 
    req: NextApiRequest, 
    res: NextApiResponse 
    ): Promise<Context> {
        return {
            prisma
        }
}