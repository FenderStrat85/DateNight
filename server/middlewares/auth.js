const { User } = require('../models/models');

const authMiddleware = async (req, res, next) => {
  console.log('inside auth');
  console.log('req.body in auth', req.body);
  try {
    const { uid } = req.session;
    const user = await User.findOne({ _id: uid });
    console.log(user);
    if (!user) throw new Error();
    req.user = user;
    next();
  } catch (error) {
    return res.sendStatus(401);
  }
};

module.exports = authMiddleware;
