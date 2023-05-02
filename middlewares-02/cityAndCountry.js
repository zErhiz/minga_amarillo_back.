import Author from '../models/Author.js'


async function cityAndCountry(req,res,next) {
    const { country, city } = req.body;
    if (!country || !city) {
        return res.status(401).send('City or country not provided!');
      }
    return next()
}

export default cityAndCountry