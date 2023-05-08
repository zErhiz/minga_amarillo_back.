import Manga from "../../models/Manga.js"

let get_mangas_from_author = async (req, res, next) => {
  let query = {}

  try {
    const { author_id } = req.params;

  
    // falso descendente new ascendente
    const sort = req.query.new === "false" ? { createdAt: -1 } : { createdAt: 1 };



    let mangas = await Manga.find({ author_id },'title cover_photo description -_id').sort(sort);     // Obtener todos los mangas del autor

  
    if (mangas.length < 4) {
      return res.status(200).json({ success: true, mangas });   // menos 4 mangas todos
    }

   
    const mitadMangas = mangas.length / 2;             //si se llega a romper si ahi mas mangas le pongo mathceil o floor depende que me convengan no
    mangas = req.query.new === "false" ? mangas.slice(0, mitadMangas) : mangas.slice(mitadMangas);     //primer array y segunda parte array

    res.status(200).json({ success: true, mangas });
    
  } catch (error) {
    next(error)
  }
};
  

export default get_mangas_from_author;