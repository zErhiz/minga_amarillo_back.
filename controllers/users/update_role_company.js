import User from "../../models/User.js";
import Company from "../../models/Company.js";

const update_role_company= async (req, res, next) => {
  try {
    const { id } = req.params;

    // Buscamos por id
    const user = await User.findById(id)

let company = await Company.findOne({user_id: id})

if (!user || !company) {
  return res.status(400).json({ success: false, message: "User or company not found" });
}
if (user.role === 2 && company.active === true) {
  user.role = 0,
  company.active = false
} 
else if(user.role === 0 &&  company.active === false ){
  user.role = 2,
  company.active = true
}
const newUser = await user.save()
const newCompany = await company.save()
if (newUser === user && newCompany === company) {
  return res.status(200).json({   success: true, message: "The author is verified" });
}
else{
  return res.status(400).json({succes:false, message:"oops an error occurred in the update"})
}




  } catch (error) {
   next(error)
 
  }
};

export default update_role_company;