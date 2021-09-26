const initialState = {
  isAuthenticated: false,
  userRestaurants: null,
  user_id: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('I am in the reducer');
      return {
        ...state,
        isAuthenticated: true,
        userRestaurants: action.payload.restaurants,
        user_id: action.payload._id,
      };
    case 'REGISTER':
      console.log('I am in the reducer');
      return {
        ...state,
        isAuthenticated: true,
        userRestaurants: action.payload.restaurants,
        user_id: action.payload._id,
      };
    case 'SAVE_RESTAURANT':
      console.log(action.payload);
      return {
        ...state,
        userRestaurants: [...state.userRestaurants, action.payload],
      };
    case 'DELETE_RESTAURANT':
      console.log('I am in the delete reducer');
      let copy = [...state.userRestaurants];
      console.log('line 32 copied array reducer', copy);
      const filteredCopy = copy.filter((restaurant) => {
        restaurant.photo !== action.payload;
      });
      console.log('line 36 copied array after being filtered', filteredCopy);
      return {
        ...state,
        userRestaurants: [filteredCopy],
      };
    default:
      return state;
  }
};

export default reducer;
