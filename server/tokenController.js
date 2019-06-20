const jwt = require('jsonwebtoken');

const {secret} = require('./config.js');

module.exports = {
  checkToken(req, res, next) {
    let token = req.headers.authorization;
    if (!token || !token.startsWith('Bearer')) {
      return next('Incorrect token format');
    }
    
    token = token.split(' ')[1];
    jwt.verify(token, secret, (err, decodedToken) => {
      if (err) {
        return next(err);
      }
      req.token = decodedToken;
      console.log(req.token)
      next();
    });
  },
  
  signToken(req, res, next) {
    let token = jwt.sign({username: res.locals.username}, secret);
    console.log(token);
    res.locals.token = `Bearer ${token}`;
    next();
  }
}