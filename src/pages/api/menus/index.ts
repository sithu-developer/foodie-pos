// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth'
import { authOptions } from '../auth/[...nextauth]'
import { prisma } from '@/utils/db';
import { CreateNewMenuOption, UpdateMenuOption } from '@/types/menu';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const session = await getServerSession( req, res , authOptions);
    if(!session) return res.status(401).send("unauthorized");
    const method = req.method;
    if(method === "POST") {
        const {name , price = 0 , assetUrl , selectedMenuCategoryIds} = req.body as CreateNewMenuOption;
        const isValid = name && price !== undefined && selectedMenuCategoryIds.length > 0 ;
        if(!isValid) return res.status(400).send("Bad request");
        const newMenu = await prisma.menu.create({data : { name , price , assetUrl }});
        const newMenuId = newMenu.id;
        const menuCategoryMenus = await prisma.$transaction(
            selectedMenuCategoryIds.map((menuCategoryId) => prisma.menuCategoryMenu.create({data : {menuCategoryId ,  menuId : newMenuId}}))
        );
        res.status(200).json({newMenu, menuCategoryMenus});
    } else if (method === "PUT") {
      const {id , name , price , isAvailable , assetUrl , locationId , selectedMenuCategoryIds } = req.body as UpdateMenuOption;
      const isValid = id && name && price !== undefined && selectedMenuCategoryIds.length > 0;
      if(!isValid) return res.status(400).send("Bad request");
      const menu = await prisma.menu.findUnique({where : { id }});
      if(!menu)  return res.status(400).send("Bad request");
      const updatedMenu = await prisma.menu.update({data : {name , price , assetUrl} , where : { id }});
      await prisma.menuCategoryMenu.deleteMany({where : {menuId : id}});
      const updatedMenuCategoryMenus = await prisma.$transaction(
        selectedMenuCategoryIds.map(menuCategoryId => prisma.menuCategoryMenu.create({data : {menuCategoryId , menuId : id}}))
      );
      if(isAvailable === false) {
        const existDisable = await prisma.disabledLocationMenu.findFirst({ where : { locationId , menuId : id }});
        if(existDisable ) return res.status(200).json({updatedMenu, updatedMenuCategoryMenus})
        const disabledLocationMenu = await prisma.disabledLocationMenu.create({ data : { locationId , menuId : id}})
        return res.status(200).json({updatedMenu, updatedMenuCategoryMenus , disabledLocationMenu});
      } else if(isAvailable === true) {
        const existDisable = await prisma.disabledLocationMenu.findFirst({ where : { locationId , menuId : id }});
        if(existDisable ) {
          const disabledLocationMenu = await prisma.disabledLocationMenu.delete({ where : { id : existDisable.id }});
          return res.status(200).json({updatedMenu, updatedMenuCategoryMenus , disabledLocationMenu});
        }
        return res.status(200).json({updatedMenu, updatedMenuCategoryMenus});
      }
    } else if (method === "DELETE") {
      const menuId = Number(req.query.id);
      const exist = await prisma.menu.findFirst({where : {id : menuId}});
      if(!exist) return res.status(400).send("Bad request");
      await prisma.menuCategoryMenu.updateMany({where : { menuId }, data : { isArchived : true}});
      await prisma.menuAddonCategory.updateMany({ where : { menuId} , data : {isArchived : true}});
      const menu = await prisma.menu.update({where : { id : menuId}, data : {isArchived : true}});
      return res.status(200).send({menu});
    }
  res.status(405).send("Invalid method");
}


