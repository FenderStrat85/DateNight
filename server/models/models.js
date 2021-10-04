const mongoose = require('../db');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  restaurants: {
    type: Array,
    ref: 'Restaurant.photo',
  },
});

userSchema.virtual('data', {
  ref: 'Restaurant', // The model to use
  localField: 'restaurants', // Find restaurants where `localField` - localField being the userSchema
  foreignField: 'photo', // is equal to `foreignField` - foreignField being the restaurantSchema
  // If `justOne` is true, 'members' will be a single doc as opposed to
  // an array. `justOne` is false by default.
  justOne: false,
});

const restaurantSchema = new Schema({
  name: String,
  photo: String,
  latitude: Number,
  longitude: Number,
  maplink: Array,
  openNow: Boolean,
  price: Number,
  rating: Number,
  totalRatings: Number,
});

const User = mongoose.model('User', userSchema);
const Restaurant = mongoose.model('Restaurant', restaurantSchema);

module.exports = {
  User,
  Restaurant,
};
