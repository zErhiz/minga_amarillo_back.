import Author from "../models/Author";
import Company from "../models/Company"



async function is_active(req, res, next) {
  const userId = req.user.id;
  
  Author.findOne({ user_id: userId })
    .then((author) => {
      if (!author) {
        return res.status(404).json({ message: 'Author not found' });
      }
      if (!author.active) {
        return res.status(401).json({ message: 'the Author is inactive' });
      }

      Company.findOne({ user_id: userId })
        .then((company) => {
          if (!company) {
            return res.status(404).json({ message: 'Company not found' });
          }
          if (!company.active) {
            return res.status(401).json({ message: 'Coumpany inactive' });
          }
          next();
        });
    });
}

  
  export default is_active;