// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]';
import { prisma } from '@/utils/db';
import { getQrCodeUrl, qrCodeImageUpload } from '@/utils/assets';
import { Location, ORDERSTATUS } from '@prisma/client';


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const method = req.method;
    const { tableId} = req.query; // localhost:3000/api/app?companyId=1&tableId=1
    const isOrderAppRequest =  tableId;
    if (method === "GET") {
      if(isOrderAppRequest) {
          // const locations = await prisma.location.findMany({where : { companyId : Number(companyId) , isArchived : false }});
          // const locationIds = locations.map(element => element.id);
          const table = await prisma.table.findFirst({where : { id : Number(tableId) , isArchived : false}});
          if(!table)return res.status(400).send("bad request");
          const locationId = table.locationId;
          const location = await prisma.location.findFirst({ where : { id : locationId}}) as Location;
          const companyId = location.companyId;
          const company = await prisma.company.findUnique({ where : { id : companyId }})
          let menuCategories = await prisma.menuCategory.findMany({where : { companyId : Number(companyId) , isArchived : false }});
          const menuCategoryIds = menuCategories.map(element => element.id);
          const disabledMenuCategoryIds = (await prisma.disabledLocationMenuCategory.findMany({where : {menuCategoryId : { in : menuCategoryIds} , locationId }})).map(item => item.menuCategoryId);
          menuCategories = menuCategories.filter(item => !disabledMenuCategoryIds.includes(item.id));
          const menuCategoryMenus = await prisma.menuCategoryMenu.findMany({where : {menuCategoryId : {in : menuCategoryIds} , isArchived : false }});
          const menuCategoryMenuIds = menuCategoryMenus.map(element => element.menuId);
          let menus = await prisma.menu.findMany({where : {id : {in : menuCategoryMenuIds } ,  isArchived : false }});
          const menusIds = menus.map(element => element.id);
          const disabledMenuIds = (await prisma.disabledLocationMenu.findMany({ where : { menuId : { in : menusIds} , locationId }})).map(item => item.menuId);
          menus = menus.filter(item => !disabledMenuIds.includes(item.id))
          const menuAddonCategories = await prisma.menuAddonCategory.findMany({where : { menuId : { in : menusIds} , isArchived : false }});
          const addonCategoryIds = menuAddonCategories.map(element => element.addonCategoryId);
          const addonCategories = await prisma.addonCategory.findMany({where : {id : { in : addonCategoryIds } , isArchived : false }});
          const addons = await prisma.addon.findMany({where : {addonCategoryId : { in : addonCategoryIds} , isArchived : false }});
          // const tables = await prisma.table.findMany({where : { locationId , isArchived : false }});
          
          // you can find orders only with tableId
          const restOrderingOrders = await prisma.order.findMany({ where : { tableId : Number(tableId) , status : { in : [ORDERSTATUS.PENDING , ORDERSTATUS.COOKING]}} , orderBy : { id : "asc"}}); 
          const allCurrentOrderingOrders = restOrderingOrders.length ? await prisma.order.findMany({ where : { orderSeq : restOrderingOrders[0].orderSeq } , orderBy : { id : "asc"}}): [];
          return res.status(200).json({
            company,
            menuCategories,
            menus,
            menuCategoryMenus,
            addonCategories,
            addons,
            menuAddonCategories,
            locations : [],
            tables : [ table ],
            disabledLocationMenuCategories : [],
            disabledLocationMenus : [],
            orders : allCurrentOrderingOrders,
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
          const newCompanyStreet = "3 - 73 Street";
          const newCompanyTownShip = "Aung Myae Thar Zan";
          const newCompanyCity = "Mandalay";
          const company = await prisma.company.create({data : {name : newCompanyName , city : newCompanyCity , street : newCompanyStreet , township : newCompanyTownShip }})
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
          const location = await prisma.location.create({data : { name : newLocationName , companyId : company.id ,  city : newCompanyCity , street : newCompanyStreet , township : newCompanyTownShip  }})
          const locations = await prisma.location.findMany({where : { companyId : company.id, isArchived : false }});
  
          // 10. create new table 
          const newTableName = "Default table";
          const preTable = await prisma.table.create({data : {name : newTableName, locationId : location.id , assetUrl : "" }});
          await qrCodeImageUpload( preTable.id);
          const assetUrl = getQrCodeUrl( preTable.id)
          const table = await prisma.table.update({where : { id : preTable.id} , data : {assetUrl}})
          return res.send({
            company ,
            menuCategories : [menuCategory],
            menus : [menu],
            menuCategoryMenus : [menuCategoryMenu],  // check here
            addonCategories : [addonCategory],
            addons,
            menuAddonCategories : [menuAddonCategory],
            locations, // this plural variable is for saving locationId in localStorage for new user
            tables : [table],
            orders : []
          })
        } else {
          const companyId = dbUser.companyId;
          const company = await prisma.company.findFirst({ where : { id : companyId }})
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
          const orders = await prisma.order.findMany({where : { tableId : { in :  tables.map(table => table.id)}} , orderBy : {id : "asc"}})
          return res.status(200).json({
            company,
            menuCategories,
            menus,
            menuCategoryMenus,
            addonCategories,
            addons,
            menuAddonCategories,
            locations,
            tables,
            disabledLocationMenuCategories,
            disabledLocationMenus,
            orders
          });
        }
      }
    }
    res.send({name : "ok"});
}

