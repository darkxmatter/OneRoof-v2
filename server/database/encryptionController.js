const bcrypt = require('bcryptjs');
const db = require('./index.js');
const SALT_WORK_FACTOR = 10;

module.exports = {
  encryptPassword(req, res, next) {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
      if (err) {
        return next(err);
      }
      bcrypt.hash(req.body.pwd, salt, (err, hash) => {
        if (err) {
          return next(err);
        }
        req.body.pwd = hash;
        next();
      });
    });
  },

  comparePassword(req, res, next) {
    const queryString = 'SELECT * FROM users WHERE name = $1';
    const values = [req.body.data.name];
    db.query(queryString, values, (err, result) => {
      if (err || !result.rows[0]) {
        return next(err);
      }
      bcrypt.compare(req.body.data.pwd, result.rows[0].pwd, (err, isMatch) => {
        if (err) {
          return next(err);
        }
        if (isMatch) {
          res.locals.encryptedPassword = result.rows[0].pwd;
          return next();
        }
        //redirect???
        return next('wrong password entered');
      });
    });
  }
}