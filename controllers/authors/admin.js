import Author from "../../models/Author.js";

let admin = async (req, res, next) => {
  try {
    const activeAuthors = await Author.find({ active: true });
    const inactiveAuthors = await Author.find({ active: false });

    const resultado = {
      activeAuthors,
      inactiveAuthors
    };

    if (activeAuthors.length === 0 && inactiveAuthors.length === 0) {
      return res.status(404).json({ error: "No authors found" });
    }

    res.status(200).json(resultado);
  } catch (error) {
    next(error);
  }
};
 
export default admin;