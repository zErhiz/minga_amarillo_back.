async function addFrontPhoto(req, res, next) {
    req.body.cover_photo = req.body.pages
    next()
}

export default addFrontPhoto