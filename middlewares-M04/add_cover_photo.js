async function addCoverPhoto(req, res, next) {
    
    req.body.cover_photo = req.body.pages
    next()
}

export default addCoverPhoto