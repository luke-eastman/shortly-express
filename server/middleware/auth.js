const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
  return models.Sessions.create()
    .then(session => {
      return models.Sessions.get({id: session.insertId});
    })
    .then(session => {
      req.session = session;
      res.cookie('shortlyid', session.hash);
      next();
    });
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/