import Company from "../../models/Company.js"

     let create =  async (req, res, next) => {
        try {
            req.body.user_id = '64496464077201479936117b'
            req.body.active = true
            await Company.create(req.body)
            return res.status(200).json({
                success: true,
                message: 'New company created succesfuly',
                data: req.body
            })
        } catch (error) {
            next(error)
        }
}

export default create

// //const { user } = req
// req.body.user_id = req.user._id
// req.body.active = true