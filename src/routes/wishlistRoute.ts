import { Router, Request, Response} from "express";
import { Wishlist, WishlistDBContext } from "../models/Wishlist";
import authenticate from "../middlewares/authenticate";
import jwt, { JwtPayload } from "jsonwebtoken"
const context = new WishlistDBContext();

const wishlistRouter = Router();
export default wishlistRouter

wishlistRouter.get("/index",authenticate, async (req: Request,res: Response)=>{
  
  try {
    const payload = jwt.decode(req.headers.token as string) as JwtPayload
    
    
    const orders = await context.index(payload.id )
    res.status(200).json(orders)
  } catch(err) {
    res.status(400).json({err})
  }
})



wishlistRouter.post("/add/:product_id",authenticate, async (req: Request,res: Response)=>{
  
    try {
      const payload = jwt.decode(req.headers.token as string) as JwtPayload
      const user_id  = payload.id
      const order = await context.add(req.params.product_id,  user_id)
      res.status(200).json(order)
    } catch(err) {
      res.status(400).json({err})
    }
})
wishlistRouter.delete("/remove/:product_id",authenticate, async (req: Request,res: Response)=>{
  
	try {
		const payload = jwt.decode(req.headers.token as string) as JwtPayload
		const user_id  = payload.id
		const order = await context.remove(req.params.product_id,  user_id)
		res.status(200).json(order)
	} catch(err) {
		res.status(400).json({err})
	}
})
