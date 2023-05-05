import Author from "../models/Author";
import Company from "../models/Company"



function is_active(req, res, next) {
    const userId = req.user.id; // obtenenemos el id 
    // buscamos el autorsito 
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
            // si el autor y la companie esta activo y existe continuar con la siguiente función
            next();
          })
          .catch((error) => {
            console.error(error);
            return res.status(500).json({ message: 'Error' });
          });
      })
      .catch((error) => {                                        //El Error 500 significa que algo ha fallado en el sitio web.
        console.error(error);
        return res.status(500).json({ message: 'Error ' });
      });
  }
  
  export default is_active;