import Comment from "../models/Comment.js";

const property = async (req, res, next) => {
  const commentId = req.body.comment_id;
  const authorId = req.body.user_id;

  try {
    const comment = await Comment.findOne({_id: commentId, user_id: authorId});

    if (comment) {
      return res.status(200).json({message: "Comment modified/deleted by author"});
    }
    

    next();
  } catch (err) {
    return res.status(500).json({message: "Not allowed"});
  }
};

export default property;
