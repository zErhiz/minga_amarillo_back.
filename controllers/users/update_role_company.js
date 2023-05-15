import User from "../../models/User.js";
import Company from "../../models/Company.js";

const update_role_company= async (req, res, next) => {
  try {
    const { id } = req.params;

    // Buscamos por id
    const user = await User.findByIdAndUpdate(id, { role: 2 });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    if (user.role === 2) {
      return res.status(400).json({ error: "The user is already an Company" });
    }

    let company = await Company.findOneAndUpdate(
      { user_id: id },
      { active: true },
      { new: true }
    );
    if (!company) {
      return res.status(404).json({ error: "company not found" });
    }

    company.active = true; // Actualiza la propiedad "active" a true
    await company.save(); // Guarda los cambios en la base de datos

    return res.json({   success: true, message: "The company is verified" });
  } catch (error) {
    next(error);
  }
};

export default update_role_company;