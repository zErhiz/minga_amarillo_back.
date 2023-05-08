import Manga from "../../models/Manga.js"

let get_mangas_from_author = async (req, res, next) => {
  let query = {}
console.log(query)
  try {
    const { author_id } = req.params;
    const sortBooleano = req.query.new === "new";
    

    const sort = sortBooleano ? { createdAt: -1 } : { createdAt: 1 }; //mas recientes primero mas viejos segundo
    let mangas = await Manga.find({ author_id }, 'title cover_photo description -_id').sort(sort);
    //si el autor tiene menos de 4 agarra esos 4 y los mete y funciona el new false
    if (mangas.length <= 4) {
      return res.status(200).json({ success: true, mangas });
    }
    // divido manga 2 partes
    const mitadManga = mangas.length / 2; // si en algun momento sale algun error pongo mathCeil o floor depende lo q convenga x las dudas
    const primeraMitad = sortBooleano ? mangas.slice(0, mitadManga) : mangas.slice(mangas.length - mitadManga); //divido 2 partes desde inicio hasta la mitad y desde la mitad hasta el final
    const segundaMitad = sortBooleano ? mangas.slice(mitadManga) : mangas.slice(0, mangas.length - mitadManga); //desde la mitad hasta el final y si no desde el inicio hasta la mitad
    
   
    mangas = sortBooleano ? primeraMitad : segundaMitad; //si es new es true trae la primera mitad y si no la segunda

    
    res.status(200).json({ success: true, mangas });
    
  } catch (error) {
    next(error)
  }
};
  

export default get_mangas_from_author;