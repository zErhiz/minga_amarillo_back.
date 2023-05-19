import Company from "../../models/Company.js";

let admin = async (req, res, next) => {
  try {
    const activeCompany = await Company.find({ active: true });
    const inactiveCompany = await Company.find({ active: false });

    const resultado = {           
        activeCompany,
        inactiveCompany
    };
//si no tiene nada nignuino no encuentra
    if (activeCompany.length === 0 && inactiveCompany.length === 0) {
     
      return res.status(404).json({ error: "No companies found" });
    }

    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

export default admin;