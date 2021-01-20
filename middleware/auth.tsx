const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authHeader = req.get('Authorization')
    if (!authHeader) {
        req.isAuth = false
        return next();
    }
    
    const token = authHeader.split(' ')[1]
    if (!token || token === '') {
        console.log("no token")
        req.isAuth = false
        return next();
    }

    let decodedtoken
    try {
        decodedtoken = jwt.verify(token, 'secret_key')
    }
    catch(err){
        req.isAuth=false
        return next()
    }
    if(!decodedtoken){
        req.isAuth=false
        return next()
    }

    req.isAuth=true
    req.userId = decodedtoken.userId
    return next()
}