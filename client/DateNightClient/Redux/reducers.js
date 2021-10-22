const initialState = {
  isAuthenticated: false,
  userRestaurants: null,
  user_id: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        isAuthenticated: true,
        userRestaurants: action.payload.restaurants,
        user_id: action.payload._id,
      };
    case 'REGISTER':
      return {
        ...state,
        isAuthenticated: true,
        userRestaurants: action.payload.restaurants,
        user_id: action.payload._id,
      };
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
      };
    case 'SAVE_RESTAURANT':
      return {
        ...state,
        userRestaurants: [...state.userRestaurants, action.payload],
      };
    case 'DELETE_RESTAURANT':
      let copy = [...state.userRestaurants];
      const filteredCopy = copy.filter((restaurant) => {
        return restaurant.photo !== action.payload.resId;
      });

      return {
        ...state,
        userRestaurants: filteredCopy,
      };
    case 'SORT_BY_PRICE':
      let priceCopy = [...state.userRestaurants];
      priceCopy.sort((a, b) => a.price - b.price);
      return {
        ...state,
        userRestaurants: priceCopy,
      };
    case 'SORT_BY_RATING':
      let ratingCopy = [...state.userRestaurants];
      ratingCopy.sort((a, b) => b.rating - a.rating);
      return {
        ...state,
        userRestaurants: ratingCopy,
      };
    default:
      return state;
  }
};

export default reducer;
