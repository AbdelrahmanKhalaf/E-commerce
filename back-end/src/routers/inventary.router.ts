import { NextFunction, Response, Router, Request } from "express";
import { Inventary } from "../models/inventary.model";
const router:Router = Router()
router.get('/getAll', async (req: Request, res: Response, next: NextFunction) => {
    // get all histories in database by admin 
    try {
        const inventary = await Inventary.find().sort({ outDate: -1 }).populate({
            path:"orderId  userId prodactId",
            module:"orders  users prodacts",
        })

        return res.status(200).send({ inventary: inventary })
    } catch (err) {
        throw err
    }
})
router.get('/getByStatus', async (req: Request, res: Response, next: NextFunction) => {
    // get all histories in database by admin  with status prodact
    try {
        
        const filter = req.query.status
        const inventary = await Inventary.find({status:filter}).sort({ outDate: -1 }).populate({
            path:"orderId  userId prodactId",
            module:"orders  users prodacts",
        })
        return res.status(200).send({ inventary: inventary })
    } catch (err) {
        throw err
    }
})
export default router