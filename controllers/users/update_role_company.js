import User from "../../models/User.js";
import Company from "../../models/Company.js";

const update_role_company= async (req, res, next) => {
  try {
    const { id } = req.params;

    // Buscamos por id
    const user = await User.findById(id)

let company = await Company.findOne({user_id: id})


if (user.role === 2 && company.active === true) {
  user.role = 0,
  company.active = false
} 
else if(user.role === 0 &&  company.active === false ){
  user.role = 2,
  company.active = true
}
await user.save()
await company.save()
 


return res.status(200).json({ success: true, message: "The company is verified" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Failed to update the role"})
 
  }
};

export default update_role_company;