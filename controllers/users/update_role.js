import User from "../../models/User.js";
import Author from "../../models/Author.js";

const changerole = async (req, res, next) => {
  try {
    const { id } = req.params;

    // Buscamos por id
    const user = await User.findByIdAndUpdate(id, { role: 1 });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role === 1) {
      return res.status(400).json({ error: "The user is already an author" });
    }

    let author = await Author.findOneAndUpdate(
      { user_id: id },
      { active: true },
      { new: true }
    );
    if (!author) {
      return res.status(404).json({ error: "Author not found" });
    }

    author.active = true; // Actualiza la propiedad "active" a true
    await author.save(); // Guarda los cambios en la base de datos

    return res.json({   success: true, message: "The author is verified" });
  } catch (error) {
    next(error);
  }
};

export default changerole;