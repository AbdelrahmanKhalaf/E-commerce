import e, { NextFunction, Response, Router, Request } from "express";
import { Category, validatCategory } from "../models/categories.model";
import { AuthenticationMiddleware } from "../middleware/auth";
import { Prodact, validateProdact } from "../models/prodacts.model";
import { User } from "../models/user.model";
import { Order, validatOrder } from "../models/orders.models";
import { Inventary } from "../models/inventary.model";
import config from "../config/config";
import { strip } from "joi";
import { find, repeat } from "lodash";
import { AuthuthrationMiddleware } from "../middleware/admin";
const router: Router = Router();
router.post("/add", async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { address_en, address_ar, count, userId, prodactId } =
      req.body;
    const { error }: any = validatOrder(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const prodact: any = await Prodact.find({ _id: prodactId });
    const inventary: any = await Inventary.find({
      userId: userId,
      prodactId: prodactId,
      status: 1
    });
    if (!prodact[0])
      return res
        .status(200)
        .send({
          message_ar: "هذا المنتج الذي حددته غير موجد ",
          message_en: "The prodact is not exited with us",
        });
    const user = await User.find({ _id: userId });
    if (!user[0])
      return res
        .status(200)
        .send({
          message_ar: "هذا المستخدم الذي حددته غير موجد ",
          message_en: "The user is not exited with us",
        });
    const chackeOrderExited: any = await Order.find({
      prodactId: prodactId,
      userId: userId,
      status: 0
    });
    if (!chackeOrderExited[0]) {
      const order: any = new Order({
        address_ar: address_ar,
        address_en: address_en,
        count: count,
        price: prodact[0].price * count,
        userId: userId,
        prodactId: prodactId,
        status: 0,
        prodactDetails: {
          prodactId: prodactId,
          price: prodact[0].price,
          sale: prodact[0].sale,
          title_en: prodact[0].title_en,
          img: prodact[0].img[0].img
        }

      });
      res.status(200).send({ order: order });
      return order.save();
    }
    if (chackeOrderExited[0]) {
      const Count = Number(chackeOrderExited[0].count) + Number(count);
      const price = chackeOrderExited[0].price + count * prodact[0].price;
      if (Count == 0) {
        await Order.deleteOne({ userId: userId, prodactId: prodactId });
      }
      if (inventary[0]) {
        const countI = Number(inventary[0].count) + Number(count);
        await Inventary.updateOne(
          { userId: userId, prodactId: prodactId, status: 0 },
          {
            $set: {
              count: countI,
              status: 0,
              orderId: chackeOrderExited[0]._id,
            },
          }
        );
      }
      if (!inventary[0]) {
        const order = await Inventary.find({ _id: chackeOrderExited[0]._id, status: 0 });
        if (order[0])
          return res.status(400).send("the oreder already exists ");
        const invent = new Inventary({
          orderId: chackeOrderExited[0]._id,
          count: count,
          status: 0,
          userId: userId,
          prodactId: prodactId,
          titleProdact: prodact[0].title_en,
          idToView: prodactId

        });
        invent.save();
      }

      if (Count != 0) {
        await Order.updateOne(
          { userId: userId, prodactId: prodactId, status: 0 },
          {
            $set: {
              count: Count,
              price: price,
            },
          }
        );
      }
      const orders = await Order.find({ userId: userId, prodactId: prodactId, status: 0 });
      return res.status(200).send({ orders: orders, message_en: "done add order to your profile" });
    }
  } catch (err) {
    next(err);
  }
});
router.put(
  "/delete",
  [AuthenticationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { count, prodactId } = req.body;
      const userId = res.locals.user._id
      const prodact: any = await Prodact.find({ _id: prodactId });

      if (!prodact[0])
        return res
          .status(400)
          .send({
            message_ar: "هذا المنتج الذي حددته غير موجد ",
            message_en: "The prodact is not exited with us",
          });
      const user = await User.find({ _id: userId });
      if (!user[0])
        return res
          .status(400)
          .send({
            message_ar: "هذا المستخدم الذي حددته غير موجد ",
            message_en: "The user is not exited with us",
          });
      const chackeOrderExited: any = await Order.find({
        prodactId: prodactId,
        userId: userId,
      });
      if (!chackeOrderExited[0])
        return res.status(404).send("the order with the id is not found");
      if (
        chackeOrderExited[0].count > 1 &&
        count != chackeOrderExited[0].count
      ) {
        const Count = Number(chackeOrderExited[0].count) - Number(count);
        const price = Number(chackeOrderExited[0].price) - (count * Number(prodact[0].price));
        const inventary: any = await Inventary.find({
          userId: userId,
          prodactId: prodactId,
          status: 0
        });
        await Order.updateOne(
          { userId: userId, prodactId: prodactId, status: 0 },
          {
            $set: {
              count: Count,
              price: price,
            },
          }
        );
        if (inventary[0]) {
          const countI = Number(inventary[0].count) + Number(count);
          await Inventary.updateOne(
            { userId: userId, prodactId: prodactId, status: 0 },
            {
              $set: {
                count: countI,
                status: 0,
                orderId: chackeOrderExited[0]._id,
              },
            }
          );
        }
        if (!inventary[0]) {
          const order = await Inventary.find({ _id: chackeOrderExited[0]._id, status: 0 });
          if (order[0])
            return res.status(400).send("the oreder already exists ");
          const invent = new Inventary({
            orderId: chackeOrderExited[0]._id,
            count: count,
            status: 0,
            userId: userId,
            prodactId: prodactId,
            titleProdact: prodact[0].title_en,
            idToView: prodactId
          });
          invent.save();
        }
        const orders = await Order.find({
          userId: userId,
          prodactId: prodactId,
        }).populate({
          path: "userId prodactId",
          module: "users prodacts",
        });
        return res.status(200).send({
          orders: orders, message_ar: "لقد تم الحذف بنجاح ",
          message_en: `The order has been deletes ${count} of count  `,
        });
      }
      if (count >= chackeOrderExited[0].count) {
        const inventary: any = await Inventary.find({
          userId: userId,
          prodactId: prodactId,
          status: 1
        });
        await Order.deleteOne({ userId: userId, prodactId: prodactId });
        await Order.find({ userId: userId, prodactId: prodactId });
        if (inventary[0]) {
          const countI2 = inventary[0].count + count;
          await Inventary.updateOne(
            { userId: userId, prodactId: prodactId, status: 0 },
            {
              $set: {
                count: countI2,
                status: 0,
                orderId: chackeOrderExited[0]._id,
              },
            }
          );
        }
        if (!inventary[0]) {
          const order = await Inventary.find({ _id: chackeOrderExited[0]._id, status: 1 });
          if (order[0])
            return res.status(400).send("the oreder already exists ");
          const invent = new Inventary({
            orderId: chackeOrderExited[0]._id,
            count: count,
            status: 0,
            userId: userId,
            prodactId: prodactId,
            titleProdact: chackeOrderExited[0].title_en,
            idToView: prodactId
          });
          invent.save();
        }
        return res
          .status(200)
          .send({
            message_ar: "لقد تم الحذف بنجاح ",
            message_en: "The order has been deleted",
          });
      }
      return;
    } catch (err) {
      throw err;
    }
  }
);
router.put(
  "/Buydone",
  [AuthenticationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { count, prodactId } = req.body;
      const userId = res.locals.user._id
      const prodact: any = await Prodact.find({ _id: prodactId });
      if (!prodact[0])
        return res
          .status(400)
          .send({
            message_ar: "هذا المنتج الذي حددته غير موجد ",
            message_en: "The prodact is not exited with us",
          });
      const user = await User.find({ _id: userId });
      if (!user[0])
        return res
          .status(400)
          .send({
            message_ar: "هذا المستخدم الذي حددته غير موجد ",
            message_en: "The user is not exited with us",
          });
      const chackeOrderExited: any = await Order.find({
        prodactId: prodactId,
        userId: userId,
        status: 0
      });
      if (!chackeOrderExited[0])
        return res.status(404).send("the order with the id is not found");
      if (
        chackeOrderExited[0].count > 1 &&
        count != chackeOrderExited[0].count
      ) {
        const Count = Number(chackeOrderExited[0].count) - Number(count);
        const price = Number(chackeOrderExited[0].price) - (count * Number(prodact[0].price));
        const inventary: any = await Inventary.find({
          userId: userId,
          prodactId: prodactId,
          status: 2
        });
        await Order.updateOne(
          { userId: userId, prodactId: prodactId, status: 0 },
          {
            $set: {
              count: Count,
              price: price,
            },
          }
        );
        const statusOfOrderBuy = 2;
        const orderBuy: any = await Order.find({ userId: userId, prodactId: prodactId, status: statusOfOrderBuy })

        if (!orderBuy[0] || orderBuy == ([] || undefined)) {
          const order: any = new Order({
            address_ar: chackeOrderExited[0].address_ar,
            address_en: chackeOrderExited[0].address_en,
            count: count,
            price: prodact[0].price * count,
            userId: userId,
            prodactId: prodactId,
            status: 2,
            prodactDetails: {
              prodactId: prodactId,
              price: prodact[0].price,
              sale: prodact[0].sale,
              title_en: prodact[0].title_en,
              img: prodact[0].img[0].img
            }
          });
          order.save()
        } else {
          const countOfOrderBuy = Number(orderBuy[0].count) + Number(count);;
          const priceOfOrderBuy = Number(orderBuy[0].price) + (count * Number(prodact[0].price));
          await Order.updateOne({ userId: userId, prodactId: prodactId, status: statusOfOrderBuy }, {
            $set: {
              count: countOfOrderBuy,
              price: priceOfOrderBuy,
              status: 2
            }
          })
        }
        if (inventary[0]) {
          const countI = Number(inventary[0].count) + Number(count);
          await Inventary.updateOne(
            { userId: userId, prodactId: prodactId, status: 2 },
            {
              $set: {
                count: countI,
                status: 2,
                orderId: chackeOrderExited[0]._id,
              },
            }
          );
        }
        if (!inventary[0]) {
          const order = await Inventary.find({ _id: chackeOrderExited[0]._id, status: 2 });
          if (order[0])
            return res.status(400).send("the oreder already exists ");
          const invent = new Inventary({
            orderId: chackeOrderExited[0]._id,
            count: count,
            status: 2,
            userId: userId,
            prodactId: prodactId,
            titleProdact: prodact[0].title_en,
            idToView: prodactId
          });
          invent.save();
        }
        const orders = await Order.find({
          userId: userId,
          prodactId: prodactId,
          status: 2
        })
        const order = await Order.find({
          userId: userId,
          prodactId: prodactId,
          status: 0
        }).populate({
          path: "userId prodactId",
          module: "users prodacts",
        });
        return res.status(200).send({
          orders: orders[0], order: order, message_ar: "لقد تم الحذف بنجاح ",
          message_en: `The order has been deletes ${count} of count  `,
        });
      }
      if (count >= chackeOrderExited[0].count) {
        const inventary: any = await Inventary.find({
          userId: userId,
          prodactId: prodactId,
          status: 2
        });
        await Order.deleteOne({ userId: userId, prodactId: prodactId, status: 0 });
        if (inventary[0]) {
          const countI2 = inventary[0].count + count;
          await Inventary.updateOne(
            { userId: userId, prodactId: prodactId, status: 2 },
            {
              $set: {
                count: countI2,
                status: 2,
                orderId: chackeOrderExited[0]._id,
              },
            }
          );
        }
        if (!inventary[0]) {
          const order = await Inventary.find({ _id: chackeOrderExited[0]._id, status: 2 });
          if (order[0])
            return res.status(400).send("the oreder already exists ");
          const invent = new Inventary({
            orderId: chackeOrderExited[0]._id,
            count: count,
            status: 2,
            userId: userId,
            prodactId: prodactId,
            titleProdact: chackeOrderExited[0].title_en,
            idToView: prodactId
          });
          invent.save();
        }
        const statusOfOrderBuy = 2;
        const orderBuy: any = await Order.find({ userId: userId, prodactId: prodactId, status: statusOfOrderBuy })
        if (!orderBuy[0] || orderBuy == ([] || undefined)) {
          const order: any = new Order({
            address_ar: chackeOrderExited[0].address_ar,
            address_en: chackeOrderExited[0].address_en,
            count: count,
            price: prodact[0].price * count,
            userId: userId,
            prodactId: prodactId,
            status: 2,
            prodactDetails: {
              prodactId: prodactId,
              price: prodact[0].price,
              sale: prodact[0].sale,
              title_en: prodact[0].title_en,
              img: prodact[0].img[0].img
            }
          });
          order.save()
          return res
            .status(200)
            .send({
              message_ar: "لقد تم الحذف بنجاح ",
              message_en: "The order has been deleted",
              order: order
            });
        } else {
          const countOfOrderBuy = Number(orderBuy[0].count) + Number(count);;
          const priceOfOrderBuy = Number(orderBuy[0].price) + (count * Number(prodact[0].price));
          await Order.updateOne({ userId: userId, prodactId: prodactId, status: statusOfOrderBuy }, {

            $set: {
              count: countOfOrderBuy,
              price: priceOfOrderBuy,
              status: 2
            }
          })
          const orders = await Order.find({
            userId: userId,
            prodactId: prodactId,
            status: 2
          })

          return res
            .status(200)
            .send({
              message_ar: "لقد تم الحذف بنجاح ",
              message_en: "The order has been deleted",
              order: orders[0]
            });
        }



      }
      return;
    } catch (err) {
      throw err;
    }
  }
);
router.delete('/deleteAll',
  [AuthenticationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orders: any = await Order.find({ userId: res.locals.user._id })
      for (let i = 0; i < orders.length; i++) {
        const order = orders[i];
        const inventaries: any = await Inventary.find({ prodactId: order.prodactId, userId: order.userId, status: 0 })
        if (inventaries[0]) {
          const count = Number(inventaries[0].count) + Number(orders[i].count);
          await Inventary.updateOne(
            { prodactId: inventaries[0].prodactId, userId: inventaries[0].userId, status: 0 },
            {
              $set: {
                count: count,
                status: 0,
                orderId: order._id,
              },
            }
          );
        }
        const prodactTitle: any = await Prodact.find({ _id: order.prodactId })
        if (!inventaries[0]) {
          const invent = new Inventary({
            orderId: order._id,
            count: Number(order.count),
            status: 0,
            userId: order.userId,
            prodactId: order.prodactId,
            titleProdact: prodactTitle[0].title_en,
            idToView: order.prodactId
          });
          invent.save();
        }
      }
      await Order.deleteMany({ userId: res.locals.user._id, status: 0 });
      return res
        .status(200)
        .send({
          message_ar: "لقد تم الحذف بنجاح ",
          message_en: "The order has been deleted",
        });

    } catch (err) {
      return res.status(400).send(err)
    }
  }
)
router.get("/", async (req: Request, res: Response, next: NextFunction) => {
  const orders = await Order.find().populate({
    path: "userId prodactId",
    module: "users prodacts",
  });
  res.status(200).send({ orders: orders });
});
router.get(
  "/ordersUser",
  [AuthenticationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({ userId: res.locals.user._id }).populate({
      path: "userId prodactId",
      module: "users prodacts",
    });
    res.status(200).send({ orders: orders });
  }
);
router.get(
  "/orderDetails/:id",
  [AuthenticationMiddleware],
  async (req: Request, res: Response, next: NextFunction) => {
    const orders = await Order.find({ _id: req.params.id }).populate({
      path: "userId prodactId",
      module: "users prodacts",
    });
    res.status(200).send({ orders: orders });
  }
);
router.post("/buy/:id", async (req: Request, res: Response, next: NextFunction) => {
  const orders: any = await Order.updateOne({ userId: res.locals.user._id, prodactId: req.params.id }, {
    status: 1
  });


});
// const foo = ["0", "0", "0"];
// const [n] = foo;
// console.log(n);

export default router;
