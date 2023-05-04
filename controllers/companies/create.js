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
            return res.status(400).json({
                success: false,
                message: "ERROR CREATING COMPANY",
            })
        }
}

export default create

