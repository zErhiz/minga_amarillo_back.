import Manga from "../../models/Manga.js";

let get_mangas_from_author = async (req, res, next) => {
  try {
    const { author_id } = req.params;
    const sortBooleano = req.query.new === "true";

    const sort = sortBooleano ? { createdAt: -1 } : { createdAt: 1 }; //mas recientes primero mas viejos segundo
    const skip = 0; // no saltea ninguno
    
    const contador = await Manga.countDocuments({ author_id }); // cuento todos los documentos con ese id
    const limit = contador < 4 ? contador : Math.ceil(contador/2); //si los mangas son menores a 4 doy todos los que son si no  los divido por la mitad
    
    if (contador === 0) {
      return res.status(200).json({
        success: false,
        message: "there are not mangas created by this author",
      });
    }
    //si ahi mangas agarro y uso esto
    const mangas = await Manga.find(  { author_id }, "title cover_photo description -_id")
      .sort(sort)
      .limit(limit)
      .skip(skip);

    res.status(200).json({
      success: true,
      mangas,
    });
  } catch (error) {
    next(error);
  }
};

export default get_mangas_from_author;
