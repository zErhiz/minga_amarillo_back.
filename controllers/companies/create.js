import Company from "../../models/Company.js"
import User from "../../models/User.js"
     let create =  async (req, res, next) => {
        try {
            const user = req.user
      req.body.user_id = user._id
            req.body.active = false
            await Company.create(req.body)
            return res.status(200).json({
                success: true,
                message: 'New company created succesfuly',
                data: req.body
            })
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "ERROR CREATING COMPANY",
            })
        }
}

export default create

