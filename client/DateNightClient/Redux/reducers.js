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
    default:
      return state;
  }
};

export default reducer;
