// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/utils/db';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const method = req.method;
    if (method === "GET") {
      const session = await getServerSession(req, res, authOptions);
      if (!session) return res.status(401).send("unauthorized");
      const user = session.user;
      const name = user?.name;
      const email = user?.email as string;
      const dbUser = await prisma.users.findUnique({where : {email}});
      if(!dbUser) {
        // 1. create new company for user
        const newCompanyName = "Ah Wa Sarr";
        const newCompanyAddress = "Aung Myae Thar Zan";
        const company = await prisma.company.create({data : {name : newCompanyName , address : newCompanyAddress}})
        // 2. create new user
        await prisma.users.create({data : {email, name , companyId : company.id }});
        // 3. create new menu category
        const newMenuCategoryName = "Default Menu Category";
        const menuCategory = await prisma.menuCategory.create({data : {name : newMenuCategoryName, companyId : company.id }});
        // 4. create new menu
        const newMenuName = "Default Menu";
        const menu = await prisma.menu.create({data : {name : newMenuName , price : 1000 }});
        // 5. create new row in MenuCategoryMenu
        const menuCategoryMenu = await prisma.menuCategoryMenu.create({data : {menuCategoryId : menuCategory.id , menuId : menu.id }});
        // 6. create new addon Category
        const newAddonCategoryName = "Default addon Category";
        const addonCategory = await prisma.addonCategory.create({data : {name : newAddonCategoryName }});
        // 7. create new row in MenuAddonCategory
        const menuAddonCategory = await prisma.menuAddonCategory.create({data : {menuId : menu.id , addonCategoryId : addonCategory.id}});
        // 8. create addon
        const newAddonNameOne = "Default addon 1";
        const newAddonNameTwo = "Default addon 2";
        const newAddonNameThree = "Default addon 3";
        const newAddonsData = [
          {name : newAddonNameOne , addonCategoryId  : addonCategory.id},
          {name : newAddonNameTwo , addonCategoryId  : addonCategory.id},
          {name : newAddonNameThree , addonCategoryId  : addonCategory.id}
        ];
        const addons = await prisma.$transaction(
          newAddonsData.map(addon => prisma.addon.create({data : addon}))
        );

        // 9. create location
        const newLocationName = "Sanchaung";
        const location = await prisma.location.create({data : { name : newLocationName , companyId : company.id , address : newCompanyAddress}})
        // 10. create new table 
        const newTableName = "Default table";
        const table = await prisma.table.create({data : {name : newTableName, locationId : location.id }})
        return res.send({
          menuCategory,
          menu,
          menuCategoryMenu,  // check here
          addonCategory,
          addons,
          menuAddonCategory,
          location,
          table
        })
      } else {
        const companyId = dbUser.companyId;
        const locations = await prisma.location.findMany({where : { companyId }});
        const locationIds = locations.map(element => element.id);
        const menuCategories = await prisma.menuCategory.findMany({where : { companyId  , isArchived : false }});
        const menuCategoryIds = menuCategories.map(element => element.id);
        const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({where : {menuCategoryId : {in : menuCategoryIds} , isArchived : false }});
        const menuCategoryMenuIds = menuCategoryMenus.map(element => element.menuId);
        const menus = await prisma.menu.findMany({where : {id : {in : menuCategoryMenuIds } ,  isArchived : false }});
        const menusIds = menus.map(element => element.id);
        const menuAddonCategories = await prisma.menuAddonCategory.findMany({where : { menuId : { in : menusIds} , isArchived : false }});
        const addonCategoryIds = menuAddonCategories.map(element => element.addonCategoryId);
        const addonCategories = await prisma.addonCategory.findMany({where : {id : { in : addonCategoryIds } , isArchived : false }});
        const addons = await prisma.addon.findMany({where : {addonCategoryId : { in : addonCategoryIds} , isArchived : false }});
        const tables = await prisma.table.findMany({where : { locationId : { in : locationIds} }});
        return res.status(200).json({
          menuCategories,
          menus,
          menuCategoryMenus,
          addonCategories,
          addons,
          menuAddonCategories,
          locations,
          tables
        });
      }
    }
    res.send({name : "ok"});
}
