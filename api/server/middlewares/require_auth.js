module.exports = (req, res, next) => {
  if (process.env.NODE_ENV === 'development') {
    console.warn('No Authentication');
    if (!req.user) req.user = { _id : '5bfec3f0811f796770bdd133' };
  }

  if (!req.user) {
    return res.status(401).send({ error: 'You must log in!' });
  }

  next();
};