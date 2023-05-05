import Chapter from "../models/Chapter";
async function exist_order(req, res, next) {
    const order = req.body.order
    const existorder = await Chapter.findOne({ order: order })
    if (existorder) {
      return res.status(400).json({ error: "there is already a chapter with that order" })
    }
    next()
    
  }
  export default exist_order