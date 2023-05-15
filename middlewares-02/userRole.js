import User from "../models/User.js";

async function exist(req, res, next) {
  try {
    const user = await User.findOne({ _id: req.params.id });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if(user.role ===1){
        return res.status(400).json({error: "the user is already a author"})
    }
    if (user.role === 2) {
      return res.status(400).json({ error: "The user is already a company" });
    }
 

    next();
  } catch (error) {
  
    return res.status(500).json({ error: "error" });
  }
}

export default exist;