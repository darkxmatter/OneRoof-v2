const bcrypt = require('bcryptjs');
const db = require('./index.js');
const SALT_WORK_FACTOR = 10;

module.exports = {
  encryptPassword(req, res, next) {
    console.log('password should be getting encrpyted');
    bcrypt.getSalt(SALT_WORK_FACTOR, (err, salt) => {
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
    const queryString = 'SELECT pwd FROM users WHERE name = $1';
    const values = [req.body.name];
    db.query(queryString, values, (err, result) => {
      if (err) {
        return next(err);
      }
      bcrypt.compare(req.body.pwd, result.rows[0], (err, isMatch) => {
        if (err) {
          return next(err);
        }
        next();
      });
    });
  }
}