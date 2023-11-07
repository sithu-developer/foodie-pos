// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/utils/db';
import { UpdateAddonCategoryOptions } from '@/types/addonCategory';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession(req, res , authOptions);
    if(!session)  res.status(401).send("unauthorized");
    const method = req.method;
    if(method === "POST") {
        const { name , isRequired = false , selectedMenuIds} = req.body;
        const isValid = name && selectedMenuIds.length > 0;
        if(!isValid) return res.status(400).send("Bad request");
        const addonCategory = await prisma.addonCategory.create({data : {name , isRequired}});
        const menuAddonCategories = await prisma.$transaction(
            selectedMenuIds.map((menuId : number) => prisma.menuAddonCategory.create({data : {menuId , addonCategoryId : addonCategory.id}}))
        )
        return res.status(200).json({addonCategory , menuAddonCategories});
    } else if(method === "DELETE") {
      const id = Number(req.query.id);
      const isValid = await prisma.addonCategory.findFirst({where : { id }});
      if(!isValid) return res.status(400).send("Bad request");
      await prisma.menuAddonCategory.updateMany({ where : { addonCategoryId : id} , data : {isArchived : true}});
      await prisma.addon.updateMany({where : {addonCategoryId : id } , data : { isArchived : true }})
      const addonCategory = await prisma.addonCategory.update({ where : { id } , data : { isArchived : true }});
      return res.status(200).json({addonCategory});
    } else if(method === "PUT") {
      const { id , name , isRequired , selectedMenuIds } = req.body as UpdateAddonCategoryOptions;
      const isValid = id && name && isRequired!==undefined && selectedMenuIds.length > 0;
      if(!isValid) return res.status(400).send("Bad request");
      
      //update addon category 
      const check = await prisma.addonCategory.findFirst({ where : { id }});
      if(!check) return res.status(400).send("Bad request");
      const addonCategory = await prisma.addonCategory.update({where : { id } , data : { name , isRequired}})
      
      //update menuAddonCategories
      await prisma.menuAddonCategory.deleteMany({where : { addonCategoryId : id }});
      const menuAddonCategories = await prisma.$transaction(
        selectedMenuIds.map(menuId => prisma.menuAddonCategory.create({data : {menuId , addonCategoryId : id}}))
      );
      return res.status(200).json({ addonCategory , menuAddonCategories});
    }
  res.status(405).send("Invalid method")
}
