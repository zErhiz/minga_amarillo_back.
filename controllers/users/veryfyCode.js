import User from '../../models/User.js'

let verify_code = async (req, res, next) => {
    const { verify_code } = req.params
    try {
      const user = await User.find({ verify_code: verify_code });
      if (user.length > 0) {
        const userId = user[0]._id;
        await User.findOneAndUpdate(
          { _id: userId },
          { is_verified: true },
          { new: true }
        )
        return res.redirect('http://localhost:5173');

      } else {
        return res.status(400).json({ message: "Failed to verify user!!!" });
      }
    } catch (error) {
      next(error)
    }
  }

  export default verify_code