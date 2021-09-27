const initialState = {
  isAuthenticated: true,
  userRestaurants: null,
  user_id: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      // console.log('I am in the reducer');
      return {
        ...state,
        isAuthenticated: true,
        userRestaurants: action.payload.restaurants,
        user_id: action.payload._id,
      };
    case 'REGISTER':
      // console.log('I am in the reducer');
      return {
        ...state,
        isAuthenticated: true,
        userRestaurants: action.payload.restaurants,
        user_id: action.payload._id,
      };
    case 'SAVE_RESTAURANT':
      // console.log(action.payload);
      return {
        ...state,
        userRestaurants: [...state.userRestaurants, action.payload],
      };
    case 'DELETE_RESTAURANT':
      // console.log('I am in the delete reducer');
      let copy = [...state.userRestaurants];
      console.log('Delete reducer line 32 copied array reducer', copy);
      console.log(action.payload.resId);
      const filteredCopy = copy.filter((restaurant) => {
        return restaurant.photo !== action.payload.resId;
      });
      console.log(
        ' Delete Reducer line 36 copied array after being filtered',
        copy,
      );
      return {
        ...state,
        userRestaurants: filteredCopy,
      };
    default:
      return state;
  }
};

export default reducer;
