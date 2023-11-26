// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/utils/db';
import { CreateNewLocationOption } from '@/types/location';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession(req, res , authOptions);
    if(!session) return res.status(401).send("Unautorized")
    const method = req.method;
    if(method === "POST") {
        const user = session.user;
        const email = user?.email as string;
        const dbUser = await prisma.users.findUnique({where : {email}});
        if(!dbUser) return res.status(401).send("Unautorized");
        const companyId = dbUser.companyId;
        const {name , city , street , township } = req.body as CreateNewLocationOption;
        const isValid = name && city && street && township;
        if(!isValid) return res.status(400).send("Bad request");
        const createdLocation = await prisma.location.create({data : {name , city , street, township , companyId}});
        return res.status(200).json(createdLocation);
    }
  res.status(405).send("method not allowed")
}
