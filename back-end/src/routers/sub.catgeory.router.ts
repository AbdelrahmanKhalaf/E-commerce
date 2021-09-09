import e, { NextFunction, Response, Router, Request } from "express";
import { Category } from "../models/categories.model";
import { subOfCategory, validatesubOfCategory, validatesubOfCategoryUpdate } from "../models/sub.catgeory.model";
const router: Router = Router();
router.post(
    "/add",
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { title_ar, title_en ,IdCategory} = req.body;
            
            const { error }: any = validatesubOfCategory(req.body);
            if (error) return res.status(404).send(error.details[0].message);
            const vildeTitelEn = await subOfCategory.find({title_en:title_en})
            const vildeTitelAr = await subOfCategory.find({title_ar:title_ar})
            if (vildeTitelAr[0] || vildeTitelEn[0])  return res.status(400).send({ error_en: " الفئة موجده بي الفعل ",error_ar: "the category laredy exited" })
            const idCategory = await Category.find({_id:IdCategory})
            if (!idCategory[0]) return res.status(400).send({ error_en: "the category id not found", error_ar : "هذه الفئة التي حددتها غير صحيحه"})
            let subcategory: any = new subOfCategory({
                title_ar:title_ar,
                title_en:title_en,
                IdCategory:idCategory[0]._id
            })
            res.status(200).send({ subcategories: subcategory });
            return subcategory.save()

        } catch (err) {
            throw err
        }
    }
);
router.get('/get', async (req: Request, res: Response, next: NextFunction) => {
    const categories = await subOfCategory.find()
    return res.status(200).send({ categories: categories })
})
router.get('/get/:id', async (req: Request, res: Response, next: NextFunction) => {
    const categories:any = await subOfCategory.find({_id:req.params.id}).populate({
        path:"IdCategory",
        module:"categories"
    })
    const subcategories = await subOfCategory.find({ IdCategory:categories[0].IdCategory._id}).populate({
        path:"IdCategory",
        module:"categories"
    })    
    return res.status(200).send({ categories: subcategories })
})
router.get('/IdCategory/:id', async (req: Request, res: Response, next: NextFunction) => {
    const categories = await subOfCategory.find({IdCategory:req.params.id}).populate({
        path:"IdCategory",
        module:"categories"
    })
    return res.status(200).send({ categories: categories })
})
router.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    const id: any = req.params.id
    const prodact = await subOfCategory.find({ _id: id })
    if (!prodact[0]) return res.status(400).send({ error_ar: "هذا الفئة الذي تحاول تحديده غير موجد", error_en: "The subCatgpery you try selecte it not found" })
    const categories = await subOfCategory.deleteOne({ _id: id })
    if (categories) return res.status(200).send({ message_ar: "لقد تم حذف الفئه بنجاح من فضللك حمل الصفحه من جديد", message_en: "The catogery has been successfully deleted, please reload the page" })
    return;
})
router.put('/update/:id', async (req: Request, res: Response, next: NextFunction) => {
    const { title_ar, title_en } = req.body;
    const id: any = req.params.id
    const { error }: any = validatesubOfCategoryUpdate(req.body);
    if (error) return res.status(404).send(error.details[0].message);
    const vildeTitelAr = await subOfCategory.find({_id:{$ne:id},title_ar:title_ar})
    if (vildeTitelAr[0]) return res.status(400).send({ error_ar: " الفئة موجده بي الفعل ", })
    const vildeTitelEn = await subOfCategory.find({_id:{$ne:id},title_en:title_en})
    if (vildeTitelEn[0]) return res.status(400).send({ error_en: "the category laredy exited",})
    const prodact = await subOfCategory.find({ _id: id })
    if (!prodact[0]) return res.status(400).send({ error_ar: "هذا الفئة الذي تحاول تحديده غير موجد", error_en: "The subCatgpery you try selecte it not found" })
    const categories = await subOfCategory.updateOne({ _id: id },{
        $set:{
            title_ar:title_ar,
            title_en:title_en,
        }
    })
    if (categories) return res.status(200).send({ message_ar: "لقد تم تحديث الفئه بنجاح من فضللك حمل الصفحه من جديد", message_en: "The catogery has been successfully update, please reload the page" })
    return;
})
export default router;
