// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { prisma } from '@/utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const method = req.method;
    const session = await getServerSession(req , res , authOptions);
    if(!session) return res.status(401).send("unauthorized");
    
    if (method === "POST") {
    //data validation
    const {name , locationId} = req.body;
    const isValid = name && locationId;
    if(!isValid) return res.status(400).send("Bad request");
    const location = await prisma.location.findFirst({where : {id : locationId}});
    if(!location) return res.status(400).send("Bad request");
    const menuCategory = await prisma.menuCategory.create({data : { name , companyId : location.companyId}})
    return res.status(200).json(menuCategory);
    }


  res.status(405).send("method not allowed")
}
