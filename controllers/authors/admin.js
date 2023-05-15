import Author from "../../models/Author.js";

let admin = async (req, res, next) => {
  try {
    const allAuthors = await Author.find();       //findeo 
    const activeAuthors = allAuthors.filter(author => author.active); //filtro active 
    const inactiveAuthors = allAuthors.filter(author => !author.active);//si no esta activop

    const resultado = {           
      activeAuthors,
      inactiveAuthors
    };
//si no tiene nada nignuino no encuentra
    if (activeAuthors.length === 0 && inactiveAuthors.length === 0) {
     
      return res.status(404).json({ error: "No authors found" });
    }

    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};

export default admin;