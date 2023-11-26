// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { UpdateCompanyOptions } from '@/types/company';
import { prisma } from '@/utils/db';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const method = req.method;
    if(method === "PUT") {
        const {id , name , city , street , township } = req.body as UpdateCompanyOptions;
        const isValid = id && name && city && street && township;
        if(!isValid) return res.status(400).send("Bad request");
        const exist = await prisma.company.findUnique({ where : { id }});
        if(!exist) return res.status(400).send("Bad request");
        const updatedCompany = await prisma.company.update({ data : { name , city , street , township} , where : { id }});
        return res.status(200).json({ updatedCompany })
    }
  res.status(405).send("Invalid method")
}
