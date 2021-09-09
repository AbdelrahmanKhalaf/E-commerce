import { Request, Response } from "express";
import { stripeAPI } from "./stripe";
import config from "../config/config"
import { Router } from "express";
const router: Router = Router();
router.post('/', async (req: Request, res: Response) => {
    const dominUrl = config.URL;
    const { line_items, customer_email, prodactId, count, index } = req.body;
    // check req body has line items and email 
    console.log(prodactId);


    if (!line_items && !customer_email)
        return res.status(400).send({ error: "missing required session parmameters" })
    let sessison;
    console.log(count);
    
    try {
        sessison = await stripeAPI.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            customer_email,
            success_url: `http://localhost:4200/user/my-orders?session_id={CHECKOUT_SESSION_ID}&&prodactId=${prodactId}&&count=${count}&&index=${index}`,
            cancel_url: `http://localhost:4200/user/my-orders/canceld`,
            shipping_address_collection: { allowed_countries: ['GB', 'US', "EG"] }
        })
        console.log(sessison);

        return res.status(200).send({ sessionId: sessison.id })
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ error: "an error occured , unable to create session" });
    }
    return;
})
router.post('/walt', async (req: Request, res: Response) => {
    const dominUrl = config.URL;
    const { line_items, customer_email, walt } = req.body;
    // check req body has line items and email 
    if (!line_items && !customer_email)
        return res.status(400).send({ error: "missing required session parmameters" })
    let sessison;
    try {
        sessison = await stripeAPI.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items,
            customer_email,
            success_url: `http://localhost:4200/user/walt-add?session_id={CHECKOUT_SESSION_ID}&&walt=${walt}`,
            cancel_url: `http://localhost:4200/user/my-orders/canceld`,
            shipping_address_collection: { allowed_countries: ['GB', 'US', "EG"] }
        })
        return res.status(200).send({ sessionId: sessison.id })
    }
    catch (err) {
        console.log(err);
        res.status(400).send({ error: "an error occured , unable to create session" });
    }
    return;
})
router.get('/my-order/succsess', async (req: Request, res: Response) => {
    const session = await stripeAPI.checkout.sessions.retrieve(req.query.session_id);
    const payment = await stripeAPI.payment.retrieve(session.payment_intent)
    console.log(payment);

    const customer = await stripeAPI.customers.retrieve(session.customer);
    res.send({ user: customer.shipping.name })
    console.log(session);

})

export default router