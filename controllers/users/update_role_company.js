import User from "../../models/User.js";
import Company from "../../models/Company.js";

const update_role_company= async (req, res, next) => {
  try {
    const { id } = req.params;

    // Buscamos por id
    const user = await User.findByIdAndUpdate(id, { role: 2 });

    let company = await Company.findOneAndUpdate(
      { user_id: id },
      { active: true },
      { new: true }
    );
 


    return res.json({   success: true, message: "The company is verified" });
  } catch (error) {
    next(error);
  }
};

export default update_role_company;