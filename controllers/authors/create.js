import createHttpError from 'http-errors'
import Author from '../../models/Author.js' 
import User from '../../models/User.js'

const controller = {
  create: async (req, res, next) => {
    try {
     
      const user = req.user
      req.body.user_id = user._id
      req.body.active = false
      console.log(req.body)
      const newAuthor = await Author.create(req.body)
      return res.status(201).json({
        success: true,
        Response: newAuthor,
      })
    } catch (error) {
      next(error)
    }
  }
}

export default controller