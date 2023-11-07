// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { NewAddonOptions, UpdateAddonOptions } from '@/types/addon';
import { prisma } from '@/utils/db';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = getServerSession(req ,res , authOptions);
    if(!session) res.status(401).send("unauthorized");
    const method = req.method;
    if(method === "PUT") {
      const { id , name , price , addonCategoryId} = req.body as UpdateAddonOptions;
      const isValid = id && name && addonCategoryId && price !== undefined;
      if(!isValid) return res.status(400).send("Bad request");
      const exist = await prisma.addon.findFirst({where : { id }});
      if(!exist) return res.status(400).send("Bad request");
      const addon = await prisma.addon.update({where : { id } , data : {name , price , addonCategoryId}})
      return res.status(200).json({addon})
    } else if (method === "DELETE") {
      const id = Number(req.query.id);
      const exist = await prisma.addon.findFirst({ where : { id }});
      if(!exist) return res.status(400).send("Bad request");
      const addon = await prisma.addon.update({ where : { id } , data : { isArchived : true }});
      return res.status(200).json({addon});
    } else if (method === "POST" ) {
      const {name , addonCategoryId, price = 0 } = req.body as NewAddonOptions;
      const isValid = name && addonCategoryId && price !== undefined;
      if(!isValid) return res.status(400).send("Bad request");
      const addon = await prisma.addon.create({ data : { name , addonCategoryId , price }})
      return res.status(200).send({addon});
    }
  res.status(405).send("Invalid method");
}