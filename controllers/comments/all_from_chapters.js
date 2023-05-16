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
      sort.title = req.query.order
    }
    if(req.query.page){
      pagination.page=req.query.page
    }
    if(req.query.limit){
      pagination.limit=req.query.limit
    }
    console.log(queries)
    try {
      let all = await Comment
      .find(queries)
      .sort(sort)
      .skip(pagination.page > 0 ? (pagination.page -1)*pagination.limit:0)
      .limit(pagination.limit> 0 ? pagination.limit : 0)
      return res.status(200).json({
        success:true, response:all
      })
    } catch (error) {
      return res.status(400).json({error: "a ocurrido un problema"})
    }
    
  }
  export default all_from_chapters