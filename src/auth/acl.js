'use strict';

module.exports = (req, res, next) => {
  try {
    if (req.body.role === 'admin') {
      next();
    } else {
      next('Access Denied');
    }
  } catch(e) {
    next('Invalid Request');
  }
}