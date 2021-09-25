const bcrypt = require('bcrypt');
const { User, Restaurant } = require('../models/models');

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
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const restaurantArray = [];
    user.restaurants.map(async (item) => {
      const restaurant = await Restaurant.findOne({ photo: item });
      restaurantArray.push(restaurant);
    });
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
      user.restaurants = restaurantArray;
      res.status(200).send(user);
    }
  } catch (error) {
    res.status(500).send({ error, message: 'User not found' });
  }
};

const saveRestaurant = async (req, res) => {
  try {
    const { user_id, restaurantData } = req.body;
    console.log('save restaurant - user_id', user_id);
    const user = await User.findOne({ _id: user_id });
    console.log(user);
    const isSaved = user.restaurants.find((id) => id === restaurantData.photo);
    console.log(isSaved);
    if (isSaved) {
      return res.status(402).send(restaurantData);
    }
    user.restaurants.push(restaurantData.photo);
    user.save();
    const restaurant = await Restaurant.findOne({
      photo: restaurantData.photo,
    });
    if (!restaurant) {
      const restaurant = Restaurant.create({
        name: restaurantData.name,
        photo: restaurantData.photo,
      });
    }

    // const restaurants = user.restaurants
    // const updatedRestaurants = [...restaurants, restaurantData.photo]
    // const res = await MyModel.update({ user_id }, { restaurants. });
    // user.restaurants.push(restaurantData);
    // await user.save();
    console.log('user.restaurants', user.restaurants);
    res.status(200).send(restaurantData);
  } catch (error) {
    console.log(error);
  }
};
//needs endpoint - id of restaurant = photo property on restaurant
//filter restaurants array to remove based on the photo property

// const deleteRestaurant = async (req, res) => {
//   try {
//     const { user_id, restaurantData } = req.body;
//     const user = await User.findOne({ user_id });
//     // user.restaurants.
//   } catch (error) {
//     console.log(error);
//   }
// };

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
  saveRestaurant,
  // deleteRestaurant,
  logout,
};
