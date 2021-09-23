const bcrypt = require('bcrypt');
const User = require('../models/models');

const create = async (req, res) => {
  const { email, password } = req.body;
  console.log('inside create function');
  let salt = bcrypt.genSaltSync();
  let passwordHash = bcrypt.hashSync(password, salt);

  const userCheck = await User.findOne({ email });
  if (userCheck) {
    res.status(400).send('An error has occured');
  } else {
    const createUser = await User.create({
      email: email,
      password: passwordHash,
    });
    req.session.uid = createUser._id;
    console.log('user created big success', createUser);
    //need to change res.send to createUser.email
    res.status(200).send(createUser);
  }
};

const login = async (req, res) => {
  console.log('inside login function');
  console.log(req.body);
  try {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    const user = await User.findOne({ email });
    if (!user) {
      console.log('user does not exist');
      throw new Error();
    }
    const validatedPassword = await bcrypt.compare(password, user.password);

    if (!validatedPassword) {
      console.log('I do not exist');
      throw new Error();
    } else {
      req.session.uid = user._id;
      console.log(user);
      res.status(200).send(user.restaurants);
    }
  } catch (error) {
    res.status(500).send({ error, message: 'User not found' });
  }
};

const logout = async (req, res) => {
  req.session.destroy((error) => {
    if (error) {
      res
        .status(500)
        .send({ error, message: 'Could not log out, please try again' });
    } else {
      res.clearCookie('sid');
      res.sendStatus(200);
    }
  });
};

module.exports = {
  create,
  login,
  logout,
};
