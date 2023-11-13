// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/utils/db';
import { getQrCodeUrl, qrCodeImageUpload } from '@/utils/assets';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const method = req.method;
    const {companyId , tableId} = req.query; // localhost:3000/api/app?companyId=1&tableId=1
    const isOrderAppRequest = companyId && tableId;
    if (method === "GET") {
      if(isOrderAppRequest) {
          // const locations = await prisma.location.findMany({where : { companyId : Number(companyId) , isArchived : false }});
          // const locationIds = locations.map(element => element.id);
          let menuCategories = await prisma.menuCategory.findMany({where : { companyId : Number(companyId) , isArchived : false }});
          const menuCategoryIds = menuCategories.map(element => element.id);
          const disabledMenuCategoryIds = (await prisma.disabledLocationMenuCategory.findMany({where : {menuCategoryId : { in : menuCategoryIds}}})).map(item => item.menuCategoryId);
          menuCategories = menuCategories.filter(item => !disabledMenuCategoryIds.includes(item.id));
          const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({where : {menuCategoryId : {in : menuCategoryIds} , isArchived : false }});
          const menuCategoryMenuIds = menuCategoryMenus.map(element => element.menuId);
          let menus = await prisma.menu.findMany({where : {id : {in : menuCategoryMenuIds } ,  isArchived : false }});
          const menusIds = menus.map(element => element.id);
          const disabledMenuIds = (await prisma.disabledLocationMenu.findMany({ where : { menuId : { in : menusIds}}})).map(item => item.menuId);
          menus = menus.filter(item => !disabledMenuIds.includes(item.id))
          const menuAddonCategories = await prisma.menuAddonCategory.findMany({where : { menuId : { in : menusIds} , isArchived : false }});
          const addonCategoryIds = menuAddonCategories.map(element => element.addonCategoryId);
          const addonCategories = await prisma.addonCategory.findMany({where : {id : { in : addonCategoryIds } , isArchived : false }});
          const addons = await prisma.addon.findMany({where : {addonCategoryId : { in : addonCategoryIds} , isArchived : false }});
          // const tables = await prisma.table.findMany({where : { locationId : { in : locationIds} , isArchived : false }});
          return res.status(200).json({
            menuCategories,
            menus,
            menuCategoryMenus,
            addonCategories,
            addons,
            menuAddonCategories,
            locations : [],
            tables : [],
            disabledLocationMenuCategories : [],
            disabledLocationMenus : []
          });
      } else {
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
          const menuCategories = await prisma.menuCategory.create({data : {name : newMenuCategoryName, companyId : company.id }});
          // 4. create new menu
          const newMenuName = "Default Menu";
          const menus = await prisma.menu.create({data : {name : newMenuName , price : 1000 }});
          // 5. create new row in MenuCategoryMenu
          const menuCategoryMenus = await prisma.menuCategoryMenu.create({data : {menuCategoryId : menuCategories.id , menuId : menus.id }});
          // 6. create new addon Category
          const newAddonCategoryName = "Default addon Category";
          const addonCategories = await prisma.addonCategory.create({data : {name : newAddonCategoryName }});
          // 7. create new row in MenuAddonCategory
          const menuAddonCategories = await prisma.menuAddonCategory.create({data : {menuId : menus.id , addonCategoryId : addonCategories.id}});
          // 8. create addon
          const newAddonNameOne = "Default addon 1";
          const newAddonNameTwo = "Default addon 2";
          const newAddonNameThree = "Default addon 3";
          const newAddonsData = [
            {name : newAddonNameOne , addonCategoryId  : addonCategories.id},
            {name : newAddonNameTwo , addonCategoryId  : addonCategories.id},
            {name : newAddonNameThree , addonCategoryId  : addonCategories.id}
          ];
          const addons = await prisma.$transaction(
            newAddonsData.map(addon => prisma.addon.create({data : addon}))
          );
  
          // 9. create location
          const newLocationName = "Sanchaung";
          const location = await prisma.location.create({data : { name : newLocationName , companyId : company.id , address : newCompanyAddress}})
          const locations = await prisma.location.findMany({where : { companyId : company.id, isArchived : false }});
  
          // 10. create new table 
          const newTableName = "Default table";
          const preTable = await prisma.table.create({data : {name : newTableName, locationId : location.id , assetUrl : "" }});
          await qrCodeImageUpload(company.id , preTable.id);
          const assetUrl = getQrCodeUrl(company.id , preTable.id)
          const tables = await prisma.table.update({where : { id : preTable.id} , data : {assetUrl}})
          return res.send({
            menuCategories,
            menus,
            menuCategoryMenus,  // check here
            addonCategories,
            addons,
            menuAddonCategories,
            locations, // this plural variable is for saving locationId in localStorage for new user
            tables
          })
        } else {
          const companyId = dbUser.companyId;
          const locations = await prisma.location.findMany({where : { companyId , isArchived : false }});
          const locationIds = locations.map(element => element.id);
          const menuCategories = await prisma.menuCategory.findMany({where : { companyId  , isArchived : false }});
          const menuCategoryIds = menuCategories.map(element => element.id);
          const disabledLocationMenuCategories = await prisma.disabledLocationMenuCategory.findMany({where : {menuCategoryId : { in : menuCategoryIds}}});
          const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({where : {menuCategoryId : {in : menuCategoryIds} , isArchived : false }});
          const menuCategoryMenuIds = menuCategoryMenus.map(element => element.menuId);
          const menus = await prisma.menu.findMany({where : {id : {in : menuCategoryMenuIds } ,  isArchived : false }});
          const menusIds = menus.map(element => element.id);
          const disabledLocationMenus = await prisma.disabledLocationMenu.findMany({ where : { menuId : { in : menusIds}}})
          const menuAddonCategories = await prisma.menuAddonCategory.findMany({where : { menuId : { in : menusIds} , isArchived : false }});
          const addonCategoryIds = menuAddonCategories.map(element => element.addonCategoryId);
          const addonCategories = await prisma.addonCategory.findMany({where : {id : { in : addonCategoryIds } , isArchived : false }});
          const addons = await prisma.addon.findMany({where : {addonCategoryId : { in : addonCategoryIds} , isArchived : false }});
          const tables = await prisma.table.findMany({where : { locationId : { in : locationIds} , isArchived : false }});
          return res.status(200).json({
            menuCategories,
            menus,
            menuCategoryMenus,
            addonCategories,
            addons,
            menuAddonCategories,
            locations,
            tables,
            disabledLocationMenuCategories,
            disabledLocationMenus
          });
        }
      }
    }
    res.send({name : "ok"});
}

