// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { CartItem } from '@/types/cart';
import { CreateOrderOptions, UpdateOrderOptions } from '@/types/order';
import { prisma } from '@/utils/db';
import { Location, ORDERSTATUS, Order, Table } from '@prisma/client';
import { nanoid } from 'nanoid';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const method = req.method;
  if(method === "POST") {
    const { tableId , cartItems , totalPrice } = req.body as CreateOrderOptions;
    const isValid = tableId && cartItems.length && totalPrice;
    if(!isValid) return res.status(400).send("Bad request");
    const order = await prisma.order.findFirst({ where : { tableId  , status : { in : [ORDERSTATUS.PENDING , ORDERSTATUS.COOKING]}}});
    const orderSeq = order? order.orderSeq :  nanoid();
    for (const item of cartItems) {
      const cartItem = item as CartItem;
      const {id , menu , addons , quantity } = cartItem;
      const hasAddons = addons.length > 0;
      if(hasAddons) {
        await prisma.$transaction(
          addons.map(addon => prisma.order.create({ data : { itemId : id , menuId : menu.id ,addonId : addon.id ,  orderSeq , quantity , tableId , totalPrice , status : ORDERSTATUS.PENDING }}))
        )
      } else {
        await prisma.order.create({ data : { itemId : id , menuId : menu.id , orderSeq , quantity , tableId , totalPrice , status : ORDERSTATUS.PENDING }})
      }
    }
    const orders = await prisma.order.findMany({where : { orderSeq } , orderBy : { id : "asc"}})
    return res.status(200).json({ orders });
  } else if(method === "PUT") {
    const itemId = String(req.query.itemId);
    const { status } = req.body as UpdateOrderOptions;
    const isValid = itemId && status;
    if(!isValid) return res.status(400).send("Bad request");
    const exist = await prisma.order.findFirst({ where : { itemId }});
    if(!exist) return res.status(400).send("Bad request");
    await prisma.order.updateMany({data : { status } , where : { itemId }});
    const updatedOrder = await prisma.order.findFirst({ where : { itemId }}) as Order;
    const locationId = (await prisma.table.findFirst({ where : { id : updatedOrder.tableId }}) as Table).locationId;
    const companyId = (await prisma.location.findUnique({ where : { id : locationId }}) as Location).companyId;
    const locationIds = (await prisma.location.findMany({ where : { companyId , isArchived : false } })).map(item => item.id);
    const tableIds = (await prisma.table.findMany({ where : { locationId : { in : locationIds } , isArchived : false }})).map(item => item.id);
    const orders = await prisma.order.findMany({ where : { tableId : { in : tableIds }} , orderBy : { id : "asc"}})
    return res.status(200).json({ orders });
  } else if(method === "GET") {
    const orderSeq = String(req.query.orderSeq);
    const locationId = Number(req.query.locationId);
    if(orderSeq !== "undefined") {
      if(orderSeq === "undefined") return res.status(400).send("Bad request");
      const orders = await prisma.order.findMany({ where : { orderSeq } , orderBy : { id : "asc"} });
      if(!orders.length) return res.status(400).send("Bad request")
      return res.status(200).send({ orders });
    } else {
      if(!locationId) return res.status(400).send("Bad request")
      const companyId = (await prisma.location.findFirst({ where : { id : locationId }}) as Location).companyId;
      const locationIds = (await prisma.location.findMany({ where : { companyId , isArchived : false}})).map(item => item.id);
      const tableIds = (await prisma.table.findMany({ where : { locationId : { in : locationIds} , isArchived : false}})).map(item => item.id);
      const orders = await prisma.order.findMany({ where : { tableId : { in : tableIds}} , orderBy : { id : "asc"}});
      return res.status(200).json({ orders });
    }
  }
  res.status(405).send("Invalid method");
}
