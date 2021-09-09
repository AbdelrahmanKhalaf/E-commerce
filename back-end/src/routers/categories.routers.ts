import e, { NextFunction, Response, Router, Request } from "express";
import { Category, validatCategory } from "../models/categories.model";
import { AuthenticationMiddleware } from "../middleware/auth";
import { Prodact, validateProdact } from "../models/prodacts.model";
const router: Router = Router();
router.post(
    "/add",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title_ar, title_en } = req.body;
            const { error }: any = validatCategory(req.body);
            if (error) return res.status(404).send(error.details[0].message);
            const vildeTitelAr = await Category.find({ title_ar: title_ar })
            if (vildeTitelAr[0]) return res.status(400).send({ error: " الفئة موجده بي الفعل ", })
            const vildeTitelEn = await Category.find({ title_en: title_en })
            if (vildeTitelEn[0]) return res.status(400).send({ error: "the category laredy exited", })
            let category: any = new Category({
                title_ar: title_ar,
                title_en: title_en,
            })
            res.status(200).send({ categories: category });
            return category.save()

        } catch (err) {
            throw err
        }
    }
);
router.get('/get', async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find()
    return res.status(200).send({ categories: categories })
})
router.get('/get/:id', async (req: Request, res: Response, next: NextFunction) => {
    const categories = await Category.find({_id:req.params.id})
    return res.status(200).send({ categories: categories })
})
router.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: any = req.params.id
    const prodact = await Category.find({ _id: id })
    if (!prodact[0]) return res.status(400).send({ error_ar: "هذا الفئة الذي تحاول تحديده غير موجد", error_en: "The catgpery you try selecte it not found" })
    const categories = await Category.deleteOne({ _id: id })
    if (categories) return res.status(200).send({ message_ar: "لقد تم حذف الفئه بنجاح من فضللك حمل الصفحه من جديد", message_en: "The catogery has been successfully deleted, please reload the page" })

    return;
})
router.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { title_ar, title_en } = req.body;
    const id: any = req.params.id
    const { error }: any = validatCategory(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const vildeTitelAr = await Category.find({_id:{$ne:id},title_ar:title_ar})
    if (vildeTitelAr[0]) return res.status(400).send({ error_ar: " الفئة موجده بي الفعل ", })
    const vildeTitelEn = await Category.find({_id:{$ne:id},title_en:title_en})
    if (vildeTitelEn[0]) return res.status(400).send({ error_en: "the category laredy exited",})
    const prodact = await Category.find({ _id: id })
    if (!prodact[0]) return res.status(400).send({ error_ar: "هذا الفئة الذي تحاول تحديده غير موجد", error_en: "The subCatgpery you try selecte it not found" })
    const categories = await Category.updateOne({ _id: id },{
        $set:{
            title_ar:title_ar,
            title_en:title_en,
        }
    })
    if (categories) return res.status(200).send({ message_ar: "لقد تم تحديث الفئه بنجاح من فضللك حمل الصفحه من جديد", message_en: "The catogery has been successfully update, please reload the page" })
    return;
})

export default router;
