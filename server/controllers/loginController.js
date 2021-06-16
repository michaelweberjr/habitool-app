const db = require('../models/mongooseModel.js');
const bcrypt = require('bcryptjs');

const loginController = {};

loginController.login = async (req, res, next) => {
  const { email, password } = req.body;
  console.log(`${email} logging in`);
  try {
    const user = await db.User.findOne({ email });
    if (!user) throw new Error(`${email} was not found`);
    const hashedPass = user.password;
    const cookie = user.cookie;
    const passwordMatched = await bcrypt.compare(password, hashedPass);
    if (passwordMatched) {
      res.cookie('SSID', cookie);
      res.locals.doc = user;
      return next();
    } else throw new Error('Password does not match');
  } catch (e) {
    return next({ err: `ERROR: ${e}` });
  }
};

module.exports = loginController;
