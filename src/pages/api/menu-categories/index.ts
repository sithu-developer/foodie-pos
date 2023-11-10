// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { prisma } from '@/utils/db';
import { UpdateMenuCategoryOptions } from '@/types/menuCategory';

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
    return res.status(200).json({menuCategory});
    } else if(method === "PUT") {
      const { id , name ,isAvailable ,locationId } = req.body as UpdateMenuCategoryOptions;
      const isValid = id && name && locationId;
      if(!isValid) return res.status(400).send("Bad request");
      const exist = await prisma.menuCategory.findFirst({ where : { id }});
      if(!exist) return res.status(400).send("Bad request");
      const menuCategory = await prisma.menuCategory.update({ where : { id } , data : { name }});
      if(isAvailable === false) {
        const existDisable = await prisma.disabledLocationMenuCategory.findFirst({where : { menuCategoryId : id , locationId }});
        if(existDisable) return res.status(200).json({menuCategory})
        else {
          const disabledLocationMenuCategory =  await prisma.disabledLocationMenuCategory.create({ data  : {locationId , menuCategoryId : id }})
          return res.status(200).json({ menuCategory , disabledLocationMenuCategory});
        }
      } else if(isAvailable === true) {
        const existDisable = await prisma.disabledLocationMenuCategory.findFirst({where : { menuCategoryId : id , locationId }});
        if(existDisable) {
          await prisma.disabledLocationMenuCategory.delete({where : { id : existDisable.id} });
          return res.status(200).json({ menuCategory , disabledLocationMenuCategory : existDisable })
        } 
        return res.status(200).json({menuCategory});
    }
      
      // if(isAvailable === false) {
      //   const existDisable = await prisma.disabledLocationMenuCategory.findFirst({where : { menuCategoryId : id , locationId }});
      //   (existDisable) ? await prisma.disabledLocationMenuCategory.updateMany({where : {menuCategoryId : id , locationId } , data : { isArchived : false}})
      //   : await prisma.disabledLocationMenuCategory.create({ data  : {locationId , menuCategoryId : id }})
      // } else {
      //   const existDisable = await prisma.disabledLocationMenuCategory.findFirst({where : { menuCategoryId : id , locationId }});
      //   if(existDisable) await prisma.disabledLocationMenuCategory.updateMany({where : {menuCategoryId : id , locationId } , data : { isArchived : true}})
      // }
      // const disabledLocationMenuCategory = await prisma.disabledLocationMenuCategory.findFirst({where : { menuCategoryId : id , locationId }});
      // return res.status(200).json({menuCategory , disabledLocationMenuCategory });
    } else if (method === "DELETE") {
      const id = Number(req.query.id);
      const exist = await prisma.menuCategory.findFirst({ where : { id }});
      if(!exist) return res.status(400).send("Bad request");
      // checking for menu 
      const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({where : { menuCategoryId : id , isArchived : false }});
      const menuIds = menuCategoryMenus.map(item => item.menuId);
      menuIds.forEach(async(menuId) => {
        const menuConnections = await prisma.menuCategoryMenu.findMany({ where : { menuId , isArchived : false}});
        if(menuConnections.length === 1) {
          // checking for addon Category and addon
          const menuAddonCategories = await prisma.menuAddonCategory.findMany({ where : { menuId , isArchived : false }});
          const addonCategoryIds = menuAddonCategories.map(item => item.addonCategoryId);
          addonCategoryIds.forEach(async(addonCategoryId) => {
            const addonConnections = await prisma.menuAddonCategory.findMany({ where : { addonCategoryId , isArchived : false }});
            if(addonConnections.length === 1) {
              // delete addons and addonCategory
              await prisma.addon.updateMany({ where : {addonCategoryId} , data : { isArchived : true }});
              await prisma.addonCategory.update({ where : { id : addonCategoryId} , data : { isArchived : true }})
            }
            // delete menuAddonCategory row
            await prisma.menuAddonCategory.updateMany({ where : { menuId , addonCategoryId }, data : { isArchived : true }})
          })
          // delete menu
          await prisma.menu.update({ where : { id : menuId } , data : { isArchived : true }});
        }
        // delete menuCategoryMenu row 
        await prisma.menuCategoryMenu.updateMany({ where : { menuCategoryId : id , menuId } , data : { isArchived : true }});
      })

      // await prisma.menuCategoryMenu.updateMany({ where : { menuCategoryId : id } , data : { isArchived : true }});
      const menuCategory = await prisma.menuCategory.update({ where : { id } , data : { isArchived : true }});
      return res.status(200).json({menuCategory}); // start here
    }
  res.status(405).send("method not allowed");
}
