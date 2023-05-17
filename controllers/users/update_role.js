import User from "../../models/User.js";
import Author from "../../models/Author.js";

const changerole = async (req, res, next) => {
  try {
    const { id } = req.params;
const user = await User.findById(id)

let author1 = await Author.findOne({user_id: id})
if (!user || !author1) {
  return res.status(400).json({ success: false, message: "User or author not found" });
}

if (user.role === 1 && author1.active === true) {
  user.role = 0,
  author1.active = false
} 
else if(user.role === 0 &&  author1.active === false ){
  user.role = 1,
  author1.active = true
}
await user.save()
await author1.save()
// Buscamos por id

if (!user || !author1) {
  return res
    .status(400)
    .json({ success: false, message: "Update failed" });
}

    

    return res.status(200).json({   success: true, message: "The author is verified" });
  } catch (error) {
    next(error);
  }
};

export default changerole;