import User from "../../models/User.js";
import Author from "../../models/Author.js";

const changerole = async (req, res, next) => {
  try {
    const { id } = req.params;
const user = await User.findById(id)
console.log(user)

let author1 = await Author.findOne({user_id: id})
console.log(author1)


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


    

    return res.json({   success: true, message: "The author is verified" });
  } catch (error) {
    console.log(error)
    next(error);
  }
};

export default changerole;