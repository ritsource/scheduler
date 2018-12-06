module.exports = (req, res, next) => {
  if (process.env.NODE_ENV !== 'developmwnt') {
    console.warn('No Authentication');
    return next();
  }

  if (!req.user) {
    return res.status(401).send();
  }

  next();
};