import Comment from "../../models/Comment.js";
let all_from_chapters = async(req, res, next)=>{
    let queries ={}
    let sort={}
    let pagination={
      limit:4,
      page:1
    }
    if(req.query.comment){
      queries.comment = new RegExp(req.query.comment.trim(), 'i')
      
    } 
   
    if (req.query.order){
      sort.comment.createdAt = req.query.order
    }
    if(req.query.page){
      pagination.page=req.query.page
    }
    if(req.query.limit){
      pagination.limit=req.query.limit
    }
    if(req.query.chapter_id){
      queries.chapter_id=req.query.chapter_id
    }
    
   
    try {
      let all = await Comment
      .find(queries)
      .sort(sort)
      .skip(pagination.page > 0 ? (pagination.page -1)*pagination.limit:0)
      .limit(pagination.limit> 0 ? pagination.limit : 0).populate('user_id')
      return res.status(200).json({
        success:true, response:all
      })
    } catch (error) {
      return res.status(400).json({error: "a ocurrido un problema"})
    }
    
  }
  export default all_from_chapters