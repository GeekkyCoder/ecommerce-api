const authorize =  (...roles) => {
    return (req,res,next) => {
        // there can be more roles such as admin,owner etc...
        if(!roles.includes(req.user.role)){
            return res.status(403).json({msg:"not authorized to access this route"})
        }

        next()
    }
}

module.exports = authorize