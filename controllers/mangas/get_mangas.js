import Manga from '../../models/Manga.js'
let get_mangas = async(req, res, next)=>{
  try {
    let all = await Manga.find({
      title:{'$regex':'a', $options:'i'}
      
    })
    return res.status(200).json({
      success:true, response:all
    })
  } catch (error) {
    next (error)
  }
}
export default get_mangas