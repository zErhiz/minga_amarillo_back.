import Chapter from "../../models/Chapter.js"
let read = async(req, res, next) => { // la funcion controladora debe ser asincrona para poder esperar la respuesta de mongo 
    try                             //utilizo try cath para intentar algo y agarrar los errores q puedan surgir 
    {
let all = await Chapter.find().select('-_id -manga_id -pages -createdAt -updatedAt -__v')      //utilizo find para buscaR todos los recursos del modelo que es chapters
return res.status(200)                   //configuro la respuesta que le tengo que enviar al cliente(front)
.json({
        Chapter: all 
    })                            
    }
    catch(error){}
 console.log(error)
 return res.status(400).json({error: "a ocurrido un problema"})
  }

  export default read