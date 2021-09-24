const initialState = {
  isAuthenticated: false,
  userRestaurants: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      console.log('I am in the reducer');
      return {
        ...state,
        isAuthenticated: true,
        userRestaurants: action.payload.restaurants,
      };
    case 'REGISTER':
      console.log('I am in the reducer');
      return {
        ...state,
        isAuthenticated: true,
        userRestaurants: action.payload.restaurants,
      };
    default:
      return state;
  }
};

export default reducer;
