// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { NewTableOptions, UpdateTableOptions } from '@/types/table';
import { prisma } from '@/utils/db';
import { getQrCodeUrl, qrCodeImageUpload } from '@/utils/assets';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession(req , res , authOptions);
    if(!session) return res.status(401).send("unauthorized");
    const method = req.method;
    if(method === "PUT") {
      const {id , name , locationId} = req.body as UpdateTableOptions;
      const isValid = id && name && locationId;
      if(!isValid) return res.status(400).send("Bad request");
      const exist = await prisma.table.findFirst({ where : { id }});
      if(!exist) return res.status(400).send("Bad request");
      const table = await prisma.table.update({ where : { id } , data : { name , locationId }});
      return res.status(200).json({table});
    } else if(method === "DELETE") {
      const id = Number(req.query.id);
      const exist = await prisma.table.findFirst({ where : { id }});
      if(!exist) return res.status(400).send("Bad request");
      const table = await prisma.table.update({ where : { id } , data : { isArchived : true}});
      return res.status(200).json({table});
    } else if (method === "POST") {
      const { name , locationId } = req.body as NewTableOptions;
      const user = session.user;
      const email = user?.email as string;
      const dbUser = await prisma.users.findUnique({ where : { email }});
      const isValid = name && locationId && dbUser;
      if(!isValid) return res.status(400).send("Bad request");
      const preTable = await prisma.table.create({ data : { name , locationId , assetUrl : "" }});
      const companyId = dbUser.companyId;
      const tableId =  preTable.id;
      await qrCodeImageUpload( tableId);
      const assetUrl = getQrCodeUrl( tableId);
      const table = await prisma.table.update( { where : {id : preTable.id} , data : { assetUrl }});
      return res.status(200).json({ table });
    }
  res.status(405).send("Invalid method")
}
