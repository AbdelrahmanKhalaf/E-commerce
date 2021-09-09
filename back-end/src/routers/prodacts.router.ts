import { NextFunction, Response, Router, Request } from "express";
import { subOfCategory } from "../models/sub.catgeory.model";
import { AuthenticationMiddleware } from "../middleware/auth";
import {
    IProdact,
    Prodact,
    validatecategory,
    validateProdact,
} from "../models/prodacts.model";
import { History, validatHistory } from "../models/history.model";
import { AuthuthrationMiddleware } from "../middleware/admin";
import { ErorrResponse } from "../errors/errorResponse";
import multer from "multer";
import _ from 'lodash'
const storage = multer.diskStorage({
    destination: function (req, res, cb) {
        cb(null, "uploads");
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "_" + Date.now() + ".png");
    },
});
const fileFilter = function fileFilter(
    req: any,
    file: { mimetype: string },
    cb: (arg0: null, arg1: boolean) => void
) {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
});
const type = upload.single("img");

const router: Router = Router();
router.post(
    "/add",
    [AuthenticationMiddleware, AuthuthrationMiddleware],
    async (req: Request, res: Response, next: NextFunction) => {
        //add new prodact
        try {
            const {
                price,
                sale,
                kindOfCategory,
                attributes,
                keywords,
                title_ar,
                title_en,
                des_ar,
                des_en,
                endsale,
            }: IProdact = req.body;
            const { error } = validateProdact(req.body);
            if (error) return res.status(400).send(error.details[0].message);
            const titleEn = await Prodact.find({ title_en: title_en });
            if (titleEn[0])
                return res
                    .status(400)
                    .send({ error_en: "the title is already exited " });
            const titleAr = await Prodact.find({ title_ar: title_ar });
            if (titleAr[0])
                return res
                    .status(400)
                    .send({ error_ar: "هذا العنوان التي حددتها موجد بالفعل" });
            let prodact: any = new Prodact({
                price: price,
                sale: sale,
                keywords: keywords,
                title_ar: title_ar,
                title_en: title_en,
                des_ar: des_ar,
                des_en: des_en,
                endsale: endsale,
                kindOfCategory: kindOfCategory.map((id: any) => {
                    return id;
                }),
                attributes: attributes.map((attribute: any) => {
                    return {
                        key_ar: attribute.key_ar,
                        key_en: attribute.key_en,
                        value_ar: attribute.value_ar,
                        value_en: attribute.value_en,
                    };
                }),
            });
            // add prodact to history  with status:add
            const history = new History({
                status: "addProdact",
                prodact: {
                    name: prodact.title_en,
                    idProdact: prodact._id,
                    delete: false,
                },
                userId: res.locals.user._id,
                prodactId: prodact._id,
            });
            if (!prodact || !history) return res.send("error in prodact complate ");
            history.save();
            res.status(200).send({ prodact: prodact });
            prodact.save();
        } catch (err) {
            return next(err);
        }
    }
);
router.delete(
    "/delete/attribute/:id",
    [AuthenticationMiddleware, AuthuthrationMiddleware],
    async (req: Request, res: Response, next: NextFunction) => {
        // delete attribute to prodact exited
        try {
            const prodactId = req.params.id;
            const elmenteId = req.query.id;
            const prodact: any = await Prodact.find({ _id: prodactId });
            if (!prodact)
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول حذف عنصر منه غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            const elmente: any = await Prodact.find(
                { _id: prodactId },
                { attributes: { $elemMatch: { _id: elmenteId } }, _id: false }
            );
            if (!elmente[0].attributes[0])
                return res.status(400).send({
                    error_ar: " هذا العنصر الذي تحاول حذفه غير موجد ",
                    error_en: "The element you try delete it not found",
                });
            await Prodact.updateOne(
                { _id: prodactId },
                {
                    $pull: {
                        attributes: {
                            _id: elmenteId,
                        },
                    },
                }
            );
            //add prodact to history  with status:delte
            const history = new History({
                status: "deleteAttribute",
                prodact: {
                    name: prodact[0].title_en,
                    idProdact: prodact[0]._id,
                    delete: false,
                },
                userId: res.locals.user._id,
                prodactId: prodact[0]._id,
            });
            const attribute: any = await Prodact.find(
                { _id: prodactId },
                { attributes: true }
            );

            history.save();
            return res.status(200).send({
                message_ar: "لقد تم حذف العنصر بنجاح من فضللك حمل الصفحه من جديد",
                message_en: "The attribute has been successfully deleted",
                attribute: attribute,
            });
        } catch (err) {
            next(err);
        }
        return;
    }
);
router.put(
    "/add/attribute/:id",
    [AuthenticationMiddleware, AuthuthrationMiddleware],
    async (req: Request, res: Response, next: NextFunction) => {
        // add attribute to prodact exited
        try {
            const prodactId = req.params.id;
            const { attributes } = req.body;

            const prodact: any = await Prodact.find({ _id: prodactId });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            await Prodact.updateOne(
                { _id: prodactId },
                {
                    $push: {
                        attributes: attributes.map((attribute: any) => {
                            if (
                                (!attribute.key_en &&
                                    !attribute.key_ar &&
                                    !attribute.value_ar &&
                                    !attribute.value_en) !== false
                            )
                                return res.status(400).send({
                                    error_ar: " من فضللك ادخل بيانات صحيحه في جميع المداخل ",
                                    error_en: "please enter a data in all inpouts",
                                });
                            return {
                                key_ar: attribute.key_ar,
                                key_en: attribute.key_en,
                                value_ar: attribute.value_ar,
                                value_en: attribute.value_en,
                            };
                        }),
                    },
                }
            );
            //add prodact to history  with status:update
            const history = new History({
                status: "updateAttribute",
                prodact: {
                    name: prodact[0].title_en,
                    idProdact: prodact[0]._id,
                    delete: false,
                },
                userId: res.locals.user._id,
                prodactId: prodact[0]._id,
            });
            history.save();
            return res.status(200).send({
                message_ar: "لقد تم اضافة العنصر بنجاح ",
                message_en: "Done dd the element sucsses",
            });
        } catch (err) {
            next(err);
        }
        return;
    }
);
router.put(
    "/upate/attribute/:id",
    [AuthenticationMiddleware, AuthuthrationMiddleware],
    async (req: Request, res: Response, next: NextFunction) => {
        // add attribute to prodact exited
        try {
            const { key_ar, key_en, value_ar, value_en } = req.body;
            const prodactId = req.params.id;
            const elmenteId = req.query.id;
            const prodact: any = await Prodact.find({ _id: prodactId });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            const elmente: any = await Prodact.find(
                { _id: prodactId },
                { attributes: { $elemMatch: { _id: elmenteId } }, _id: false }
            );
            if (!elmente[0].attributes[0])
                return res.status(400).send({
                    error_ar: " هذا العنصر الذي تحاول تحديده غير موجد ",
                    error_en: "The element you try selecte it not found",
                });
            const prodactUpdate = await Prodact.updateOne(
                {
                    _id: prodactId,
                    "attributes._id": elmenteId,
                },
                {
                    $set: {
                        "attributes.$.key_ar": key_ar,
                        "attributes.$.key_en": key_en,
                        "attributes.$. value_ar": value_ar,
                        "attributes.$.value_en": value_en,
                    },
                }
            );

            //add prodact to history  with status:delte
            const history = new History({
                status: "updateAttribute",
                prodact: {
                    name: prodact[0].title_en,
                    idProdact: prodact[0]._id,
                    delete: false,
                },
                userId: res.locals.user._id,
                prodactId: prodact[0]._id,
            });

            history.save();
            return res.status(200).send({
                message_ar: "لقد تم التعديل العنصر بنجاح      ",
                message_en: "The attribute has been successfully update",
            });
        } catch (err) {
            return next(err);
        }
    }
);
router.get(
    "/get/attribute/:id",
    [AuthenticationMiddleware, AuthuthrationMiddleware],
    async (req: Request, res: Response, next: NextFunction) => {
        // get attribute from  prodact exited
        try {
            const prodactId = req.params.id;
            const elmenteId = req.query.id;
            const prodact = await Prodact.find({ _id: prodactId });
            if (!prodact)
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول حذف عنصر منه غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            const elmente: any = await Prodact.find(
                { _id: prodactId },
                { attributes: { $elemMatch: { _id: elmenteId } }, _id: false }
            );
            if (!elmente[0].attributes[0])
                return res.status(400).send({
                    error_ar: " هذا العنصر الذي تحاول حذفه غير موجد ",
                    error_en: "The element you try delete it not found",
                });
            const attribute = await Prodact.find(
                { _id: prodactId },
                { attributes: { $elemMatch: { _id: elmenteId } }, _id: false }
            );

            return res.status(200).send({ attribute: attribute });
        } catch (err) {
            return next(err);
        }
    }
);
router.get("/get", async (req: Request, res: Response, next: NextFunction) => {
    //fillter prodacts by attributes , price , sale and categories
    try {
        const arregex = /[\u0600-\u06FF]/;
        const queryName: any = req.query;
        if (
            arregex.test(queryName.value) === false &&
            queryName.value !== undefined &&
            !queryName.price && !queryName.sale && !queryName.categories
        ) {

            const prodact = await Prodact.find({
                attributes: {
                    $elemMatch: {
                        value_en: queryName.value,
                        key_en: queryName.attribute,
                    },
                } /**price: {$gt: 1500 , $lt:2000}**/,
            });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            return res.status(200).send({ prodact: prodact });
        }
        if (
            arregex.test(queryName.value) === true &&
            queryName.value !== undefined &&
            !queryName.price && !queryName.sale && !queryName.categories
        ) {
            const prodact = await Prodact.find({
                attributes: {
                    $elemMatch: {
                        value_en: queryName.value,
                        key_ar: queryName.attribute,
                    },
                } /**price: {$gt: 1500 , $lt:2000}**/,
            });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            return res.status(200).send({ prodact: prodact });
        }
        if (
            arregex.test(queryName.value) === true &&
            queryName.value !== undefined
        ) {
            const prodact = await Prodact.find({
                attributes: {
                    $elemMatch: {
                        value_ar: queryName.value,
                        key_ar: queryName.attribute,
                    },
                },
            });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            return res.status(200).send({ prodact: prodact });
        }
        if (queryName.gt) {
            const prodact = await Prodact.find({
                price: { $gt: Number(queryName.gt), $lt: Number(queryName.lt) },
            });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            return res.status(200).send({ prodact: prodact });
        }
        if (queryName.price && !queryName.sale && !queryName.value && !queryName.attribute && !queryName.categories) {
            const prodact = await Prodact.find({ price: Number(queryName.price) });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            return res.status(200).send({ prodact: prodact });
        }
        if (queryName.sale && !queryName.value && !queryName.attribute && !queryName.price && !queryName.categories) {
            const prodact = await Prodact.find({ sale: queryName.sale });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            return res.status(200).send({ prodact: prodact });
        }
        if (arregex.test(queryName.value) === false &&
            queryName.value !== undefined || queryName.sale || queryName.price || queryName.categories) {
            const prodact = await Prodact.find({
                sale: queryName.sale ? queryName.sale : false,
                price: queryName.price ? queryName.price : false,
                kindOfCategory: queryName.categories ? queryName.categories : false,
                attributes: {
                    $elemMatch: {
                        value_en: queryName.value ? queryName.value : false,
                        key_en: queryName.attribute ? queryName.attribute : false,
                    },
                }
            });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            return res.status(200).send({ prodact: prodact });
        }
        if (arregex.test(queryName.value) === true &&
            queryName.value !== undefined || queryName.sale || queryName.price || queryName.categories) {
            const prodact = await Prodact.find({
                sale: queryName.sale ? queryName.sale : false,
                price: queryName.price ? queryName.price : false,
                kindOfCategory: queryName.categories ? queryName.categories : false,
                attributes: {
                    $elemMatch: {
                        value_ar: queryName.value ? queryName.value : false,
                        key_ar: queryName.attribute ? queryName.attribute : false,
                    },
                }
            });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            return res.status(200).send({ prodact: prodact });
        }
        else if (!queryName.value && !queryName.attribute && !queryName.price && !queryName.sale && !queryName.categories) {
            let page: any = Number(req.query.page);
            let limit: any = 10;
            const lastIndex = page * limit - 1;
            const fristIndex = lastIndex - (limit - 1);
            const prodact = await Prodact.find().skip(fristIndex || 0)
                .limit(limit)
                .sort({ dateOut: -1 })
                .populate({
                    path: "kindOfCategory",
                    model: "subofcategories",
                });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            return res.status(200).send({ prodact: prodact });
        }
        return;
    } catch (err) {
        return next(err);
    }
});
router.get(
    "/getByIdCategory/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        // get prodact by categoryId
        try {
            const id: any = req.params.id;
            const prodact = await Prodact.find({ kindOfCategory: id });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            res.status(200).send({ prodact: prodact });
        } catch (err) {
            next(err);
        }
        return;
    }
);
router.get(
    "/getByCategory/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        // get prodact by categoryId
        try {
            const id: any = req.query.id;
            const prodact = await Prodact.find({ kindOfCategory: id });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            res.status(200).send({ prodact: prodact });
        } catch (err) {
            next(err);
        }
        return;
    }
);
router.get(
    "/getDetails/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        //get details prodact selecte by id
        try {
            const id: any = req.params.id;
            const prodact = await Prodact.find({ _id: id }).populate({
                path: "kindOfCategory",
                model: "subofcategories",
            });
            if (!prodact[0])
                return next(
                    new ErorrResponse(
                        {
                            error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                            error_en: "The prodact you try selecte it not found",
                        },
                        404
                    )
                );
            return res.status(200).send({ prodact: prodact });
        } catch (err) {
            next(err);
        }
        return;
    }
);
router.get(
    "/getAll",
    async (req: Request, res: Response, next: NextFunction) => {
        // get all prodact in database by admin and users
        try {
            let page: any = Number(req.query.page);
            let limit: any = Number(req.query.limit);
            const lastIndex = page * limit - 1;
            const fristIndex = lastIndex - (limit - 1);
            const length = await Prodact.find({}, { _id: true });
            const prodact = await Prodact.find()
                .skip(fristIndex || 0)
                .limit(limit)
                .sort({ dateOut: -1 })
                .populate({
                    path: "kindOfCategory",
                    model: "subofcategories",
                });
            // const prodactFillters = prodact.slice(fristIndex || 0, lastIndex + 1 || 4)
            res.status(200).send({ prodact: prodact, lenght: length.length });
        } catch (err) {
            next(err);
        }
    }
);
router.get("/sale", async (req: Request, res: Response, next: NextFunction) => {
    // get  prodacts by sale > 25%
    try {
        const prodact = await Prodact.find({
            sale: { $gt: Number(20), $lt: Number(100) },
        })
            .distinct("sale")
            .populate({
                path: "kindOfCategory",
                model: "subofcategories",
            });
        if (!prodact)
            return res.status(400).send({
                error_ar: "لا يوجد  منتاجات الان او خوصومات",
                error_en: "not found prodacts or sales",
            });
        // const prodactFillters = prodact.slice(fristIndex || 0, lastIndex + 1 || 4)
        return res.status(200).send({ prodact: prodact.reverse() });
    } catch (err) {
        return next(err);
    }
});
router.get(
    "/sale/:id",
    async (req: Request, res: Response, next: NextFunction) => {
        // get  prodacts by sale
        try {
            const prodact = await Prodact.find({ sale: req.params.id })
                .sort({ dateOut: -1 })
                .populate({
                    path: "kindOfCategory",
                    model: "subofcategories",
                });
            // const prodactFillters = prodact.slice(fristIndex || 0, lastIndex + 1 || 4)
            res.status(200).send({ prodact: prodact.reverse() });
        } catch (err) {
            next(err);
        }
    }
);
router.put(
    "/addCateg/:id",
    [AuthenticationMiddleware, AuthuthrationMiddleware],
    async (req: Request, res: Response, next: NextFunction) => {
        //update category of prodact selection by id
        try {
            const prodactId = req.params.id;
            const { kindOfCategory } = req.body;
            const { error }: any = validatecategory(req.body);
            if (error) return res.status(404).send(error.details[0].message);
            const prodact: any = await Prodact.find({ _id: prodactId });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            await Prodact.updateOne(
                { _id: prodactId },
                {
                    $push: {
                        kindOfCategory: kindOfCategory.map((id: any) => {
                            return id;
                        }),
                    },
                }
            );
            //add prodact to history  with status:update
            const history = new History({
                status: "updateCatgeory",
                prodact: {
                    name: prodact[0].title_en,
                    idProdact: prodact[0]._id,
                    delete: false,
                },
                userId: res.locals.user._id,
                prodactId: prodact[0]._id,
            });
            history.save();
            return res.status(200).send({
                message_ar: "لقد تم اضافة العنصر بنجاح ",
                message_en: "Done dd the element sucsses",
            });
        } catch (err) {
            return next(err);
        }
    }
);
router.delete(
    "/deleteCateg/:id",
    [AuthenticationMiddleware, AuthuthrationMiddleware],
    async (req: Request, res: Response, next: NextFunction) => {
        //delete category of prodact selection by id
        try {
            const prodactId = req.params.id;
            const elmenteId = req.query.id;

            const prodact: any = await Prodact.find({ _id: prodactId });
            if (!prodact)
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول حذف عنصر منه غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            const elmente: any = await Prodact.find(
                { _id: prodactId },
                { kindOfCategory: elmenteId }
            );
            if (!elmente[0].kindOfCategory[0])
                return res.status(400).send({
                    error_ar: " هذا العنصر الذي تحاول حذفه غير موجد ",
                    error_en: "The element you try delete it not found",
                });
            await Prodact.updateOne(
                { _id: prodactId },
                {
                    $pull: {
                        kindOfCategory: elmenteId,
                    },
                }
            );
            //add prodact to history  with status:delete
            const history = new History({
                status: "deleteCatgeory",
                prodact: {
                    name: prodact[0].title_en,
                    idProdact: prodact[0]._id,
                    delete: false,
                },
                userId: res.locals.user._id,
                prodactId: prodact[0]._id,
            });
            history.save();
            return res.status(200).send({
                message_ar: "لقد تم حذف العنصر بنجاح من فضللك حمل الصفحه من جديد",
                message_en:
                    "The element has been successfully deleted, please reload the page",
            });
        } catch (err) {
            return next(err);
        }
    }
);
router.put(
    "/updateProdact/:id",
    [AuthenticationMiddleware, AuthuthrationMiddleware],
    async (req: Request, res: Response, next: NextFunction) => {
        //update ( (titles) as (price or sale ) ) in this prodact selection by Id
        try {
            const { price, sale, title_ar, title_en, keywords, des_ar, des_en } =
                req.body;
            const id: any = req.params.id;
            const prodact: any = await Prodact.find({ _id: id });
            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            await Prodact.updateOne(
                { _id: id },
                {
                    $set: {
                        price: price,
                        sale: sale,
                        title_ar: title_ar,
                        title_en: title_en,
                        des_ar: des_ar,
                        des_en: des_en,
                        keywords: keywords,
                    },
                }
            );
            //add prodact to history with status:update
            const history = new History({
                status: "updateProdact",
                prodact: {
                    name: prodact[0].title_en,
                    idProdact: id,
                    delete: false,
                },
                userId: res.locals.user._id,
                prodactId: prodact[0]._id,
            });
            history.save();
            return res.status(200).send({ prodact: prodact });
        } catch (err) {
            return next(err);
        }
    }
);
router.put(
    "/img/:id/:i",
    [AuthenticationMiddleware, AuthuthrationMiddleware, type],
    async (req: Request, res: Response, next: NextFunction) => {
        //update ( (titles) as (price or sale ) ) in this prodact selection by Id
        try {
            const id: any = req.params.id;
            const index = req.params.i
            const prodact: any = await Prodact.find({ _id: id });

            if (!prodact)
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            const update = await Prodact.updateOne({ _id: id, "img._id": index }, {
                $set: {
                    'img.$.img': req.file.path
                }
            })
            // add prodact to history with status:updateIamg
            const history = new History({
                status: "updateImg",
                prodact: {
                    name: prodact[0].title_en,
                    idProdact: id,
                    delete: false,
                },
                userId: res.locals.user._id,
                prodactId: prodact[0]._id,
            });
            history.save();
            return res.status(200).send({ prodact: prodact });
        } catch (err) {
            throw err
        }
    }
);
router.delete(
    "/delete/img/:id/:i",
    [AuthenticationMiddleware, AuthuthrationMiddleware, type],
    async (req: Request, res: Response, next: NextFunction) => {
        //update ( (titles) as (price or sale ) ) in this prodact selection by Id
        try {
            const id: any = req.params.id;
            const index = req.params.i
            const prodact: any = await Prodact.find({ _id: id });

            if (!prodact[0])
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            const update = await Prodact.updateOne({ _id: id }, {
                $pull: {
                    img: {
                        _id: index
                    }
                }
            })
            // add prodact to history with status:updateIamg
            const history = new History({
                status: "deleteImg",
                prodact: {
                    name: prodact[0].title_en,
                    idProdact: id,
                    delete: false,
                },
                userId: res.locals.user._id,
                prodactId: id,
            });
            history.save();
            const prodactF: any = await Prodact.find({ _id: id });

            return res.status(200).send({ prodact: prodactF });
        } catch (err) {
            throw err
        }
    }
);
router.post(
    "/add/img/:id",
    [AuthenticationMiddleware, AuthuthrationMiddleware, type],
    async (req: Request, res: Response, next: NextFunction) => {
        //update ( (titles) as (price or sale ) ) in this prodact selection by Id
        try {
            const id: any = req.params.id;
            const index = req.params.i
            const prodact: any = await Prodact.find({ _id: id });

            if (!prodact)
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            const update = await Prodact.updateOne({ _id: id }, {
                $push: {
                    img: {
                        img: req.file.path
                    }
                }
            })
            // add prodact to history with status:updateIamg
            const history = new History({
                status: "addImg",
                prodact: {
                    name: prodact[0].title_en,
                    idProdact: id,
                    delete: false,
                },
                userId: res.locals.user._id,
                prodactId: prodact[0]._id,
            });
            const prodactF: any = await Prodact.find({ _id: id });

            history.save();
            return res.status(200).send({ prodact: prodactF });
        } catch (err) {
            throw err
        }
    }
);
router.delete(
    "/deleteProdact/:id",
    [AuthenticationMiddleware, AuthuthrationMiddleware],
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const id: any = req.params.id;
            const prodact: any = await Prodact.find({ _id: id });
            if (!prodact)
                return res.status(400).send({
                    error_ar: "هذا المنتج الذي تحاول تحديده غير موجد",
                    error_en: "The prodact you try selecte it not found",
                });
            await Prodact.deleteOne({ _id: id });

            const histories = await History.find({ prodactId: prodact[0]._id });
            histories.forEach(async (doc: any) => {
                await History.updateOne(
                    { _id: doc._id },
                    {
                        $set: {
                            prodact: {
                                idProdact: id,
                                name: prodact[0].title_en,
                                delete: true,
                            },
                        },
                    }
                );
            });
            const history = new History({
                status: "deleteProdact",
                prodact: {
                    idProdact: id,
                    name: prodact[0].title_en,
                    delete: true,
                },
                userId: res.locals.user._id,
                prodactId: prodact[0]._id,
            });
            history.save();
            return res.status(200).send({
                message_ar: "لقد تم حذف المنتج بنجاح من فضللك حمل الصفحه من جديد",
                message_en:
                    "The product has been successfully deleted, please reload the page",
            });
        } catch (err) {
            return next(err);
        }
    }
);


export default router;
 