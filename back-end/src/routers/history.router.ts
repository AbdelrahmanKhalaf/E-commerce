import { NextFunction, Response, Router, Request } from "express";
import { History, validatHistory } from "../models/history.model";
const router: Router = Router()
router.get('/getAll', async (req: Request, res: Response, next: NextFunction) => {
    // get all histories in database by admin 
    try {
        let page: any = Number(req.query.page);
        let limit: any = Number(req.query.limit);
        const lastIndex = page * limit - 1;
        const fristIndex = lastIndex - (limit - 1);
        const length: any = await History.find({},{_id:true})
        const history: any = await History.find().skip(fristIndex).limit(limit).sort({ outDate: -1 }).populate({
            path: "userId",
            module: "users",
        })        
        // const historyFillters = history.slice(fristIndex || 0, lastIndex + 1 || 15)
        return res.status(200).send({ history: history, length: length.length })
    } catch (err) {
        throw err
    }
})
router.get('/getByStatus', async (req: Request, res: Response, next: NextFunction) => {
    // get all histories in database by admin  with status prodact
    try {
        const filter = req.query.status
        let page: any = Number(req.query.page);
        let limit: any = Number(req.query.limit);
        const lastIndex = page * limit - 1;
        const fristIndex = lastIndex - (limit - 1)
        const length: any = await History.find({status: filter},{_id:true})
        const history = await History.find({ status: filter }).skip(fristIndex).limit(limit).sort({ outDate: -1 }).populate({
            path: "userId",
            module: "users",
        })
        // const historyFillters = history.slice(fristIndex || 0, lastIndex + 1 || 15)
        return res.status(200).send({ history: history, length: length.length })
    } catch (err) {
        throw err
    }
})
router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
    // get all histories in database by admin  with status prodact
    try {
        const filter = req.query.status
        const history = await History.find({ _id: req.params.id })
        return res.status(200).send({ history: history })
    } catch (err) {
        throw err
    }
})
router.delete('/delete/:id', async (req: Request, res: Response, next: NextFunction) => {
    // delete one history by id 
    try {
        await History.deleteOne({ _id: req.params.id })
        return res.status(200).send({ message: 'the history has been delete' })
    } catch (err) {
        throw err
    }
})
export default router