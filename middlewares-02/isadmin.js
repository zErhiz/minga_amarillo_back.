
import User from "../models/User.js";

async function isadmin(req, res, next) {
    if (req.user.role === 3) {
        next();
      } else {
        res.status(401).json({
          message: 'error you are not an admin',
        });
      }
    }
    
    export default isadmin;
    
    
    
    
    
    
    