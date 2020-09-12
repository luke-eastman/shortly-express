const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {

  Promise.resolve(req.cookies.shortlyid)
    .then(hash => {
      if (!hash) {
        throw hash;
      }

      return models.Sessions.get({ hash });
    })
    .then( session => {
      if (!session) {
        throw session;
      }

      return session;
    })
    .catch(session => {
      return models.Sessions.create()
        .then(results => {
          return models.Sessions.get({id: results.insertId});
        })
        .then(session => {
          res.cookie('shortlyid', session.hash);
          return session;
        });
    })
    .then(session => {
      req.session = session;
      next();
    });

};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/
// .then(user => {
//   if (user) {
//     req.session.user.username = user.username;
//     req.session.userId = user.id;
//   }
//   next();
// });

// var sessionHelper = (req, res, next) => {
//   return models.Sessions.create()
//     .then(session => {
//       return models.Sessions.get({id: session.insertId});
//     });
// };

// var sessionComplete = (req, res, next, promise) => {
//   promise.then(session => {
//     req.session = session;
//     res.cookie('shortlyid', session.hash);
//     next();
//   });
// };