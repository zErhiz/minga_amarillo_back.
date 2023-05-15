import User from "../../models/User.js";
import Author from "../../models/Author.js";

const changerole = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Buscamos por id
    const user = await User.findByIdAndUpdate(id, { role: 1 });
  

    let author = await Author.findOneAndUpdate(
      { user_id: id },
      { active: true },
      { new: true }
    );
   

    return res.json({   success: true, message: "The author is verified" });
  } catch (error) {
    next(error);
  }
};

export default changerole;