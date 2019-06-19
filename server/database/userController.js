const db = require('./index.js');

module.exports = {
  postUser(req, res, next) {
    const queryString = 'INSERT INTO users (pwd, name, apt_id, role) VALUES ($1, $2, $3, $4) RETURNING _id';
    const values = [req.body.pwd, req.body.name, req.body.apt_id, req.body.role];
    db.query(queryString, values, (err, result)=>{
        res.locals.result = result.rows;
        return next();
    })
  },

  getUser(req, res, next) {
    const queryString = 'SELECT * FROM users WHERE name = $1';
    const values = [req.body.name];
    db.query(queryString, values, (err, result) => {
      if (err) {
        return next(err);
      }
      res.locals.result = result.rows;
      return next();
    });
  },

  postEvent(req, res, next) {
    const queryString = 'INSERT INTO events (date, description, type, resident_id) VALUES ($1, $2, $3, $4) RETURNING description';
    const values = [req.body.date, req.body.description, req.body.type, req.body.resident_id];
    db.query(queryString, values, (err, result) => {
      if (err) {
        console.log(err)
        return next(err);
      }
      return next();
    });
  },

  getEvent(req, res, next){
    let queryString = '';
    let values = [];
    if(req.headers.role === 'Manager') {
      queryString = 'SELECT * FROM events';
      // queryString = 'SELECT * FROM events WHERE date >= NOW()';
    } else {
      queryString = 'SELECT * FROM events WHERE (resident_id = -1 OR resident_id IS NULL OR resident_id = $1)';
      // queryString = 'SELECT * FROM events WHERE date >= NOW() AND (resident_id IS NULL OR resident_id = $1)';
      values = [req.headers.user_id];
    }
    db.query(queryString, values, (err, result) => {
      if (err) {
        return next(err);
      }
      res.locals.result = result.rows;
      return next();
    })
  },

  getMessages(req, res, next) {
    let queryString = 'SELECT * FROM messages WHERE (sender_id = $1 AND receiver_id = $2) OR (sender_id = $2 AND receiver_id = $1)';
    let values = [req.headers.sender_id, req.headers.receiver_id];
    db.query(queryString, values, (err, result) => {
      if (err) {
        return next(err);
      }
      res.locals.result = result.rows;
      return next();
    })
  },

  postMessages(req, res, next) {
    let queryString = 'INSERT INTO messages (text, sender_id, receiver_id, timestamp) VALUES ($1, $2, $3, $4) RETURNING *';
    //do data sanitizing to prevent Will from hacking this code
    let values = [req.body.text, req.body.sender_id, req.body.receiver_id, req.body.timestamp];
    db.query(queryString, values, (err, result) => {
      if(err){
        return err;
      };
      res.locals.result = result.rows;
      return next();
    });
  },
};