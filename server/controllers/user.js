const bcrypt = require('bcryptjs');
const { User, Restaurant } = require('../models/models');

const create = async (req, res) => {
  const { email, password } = req.body;
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
    //need to change res.send to createUser.email
    res.status(200).send(createUser);
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    const restaurantArray = [];
    user.restaurants.map(async (item) => {
      const restaurant = await Restaurant.findOne({ photo: item });
      restaurantArray.push(restaurant);
    });
    if (!user) {
      throw new Error();
    }
    const validatedPassword = await bcrypt.compare(password, user.password);

    if (!validatedPassword) {
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
    const user = await User.findOne({ _id: user_id });
    const isSaved = user.restaurants.find((id) => id === restaurantData.photo);
    if (isSaved) {
      return res.status(402).send(restaurantData);
    }
    user.restaurants.push(restaurantData.photo);
    // user.save();
    const restaurant = await Restaurant.findOne({
      photo: restaurantData.photo,
    });
    if (!restaurant) {
      const restaurant = await Restaurant.create({
        name: restaurantData.name,
        photo: restaurantData.photo,
        price: restaurantData.price,
        totalRatings: restaurantData.totalRatings,
        rating: restaurantData.rating,
        mapLink: restaurantData.mapLink,
        openNow: restaurantData.openNow,
        longitude: restaurantData.longitude,
        latitude: restaurantData.latitude,
      });
    }
    await user.save();
    res.status(200).send(restaurantData);
  } catch (error) {
    console.log(error);
  }
};
//needs endpoint - id of restaurant = photo property on restaurant
//filter restaurants array to remove based on the photo property

const deleteRestaurant = async (req, res) => {
  try {
    const { user_id } = req.body;
    const { id } = req.params;
    const user = await User.findOne({ _id: user_id });
    const updatedRestaurants = user.restaurants.filter(
      (restaurant) => restaurant !== id,
    );
    user.restaurants = updatedRestaurants;
    user.save();
    res.status(200).send({ resId: id });
  } catch (error) {
    console.log(error);
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
      res.status(200).send({ id: req.body.user_id });
    }
  });
};

module.exports = {
  create,
  login,
  saveRestaurant,
  deleteRestaurant,
  logout,
};
