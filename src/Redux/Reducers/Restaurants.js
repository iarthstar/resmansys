import {
  GET_RESTAURANTS_SUCCESS,
  GET_RESTAURANTS_FAILURE,
  GET_RESTAURANT_SUCCESS,
  GET_RESTAURANT_FAILURE,
  RESET_ADD_RESTAURANT,
  ADD_RESTAURANT_SUCCESS,
  ADD_RESTAURANT_FAILURE,
  RESET_EDIT_RESTAURANT,
  EDIT_RESTAURANT_SUCCESS,
  RESET_DELETE_RESTAURANT,
  DELETE_RESTAURANT_SUCCESS
} from "../Types/Restaurants";

const initialState = {
  restaurantsResp: {},
  restaurantResp: {},
  addRestaurantResp: {},
  editRestaurantResp: {},
  deleteRestaurantResp: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case GET_RESTAURANTS_SUCCESS:
      return { ...state, restaurantsResp: payload };
    // case GET_RESTAURANTS_FAILURE:
    //   return { ...state, error: payload };

    case GET_RESTAURANT_SUCCESS:
      return { ...state, restaurantResp: payload };
    // case GET_RESTAURANT_FAILURE:
    //   return { ...state, restaurantDetailsResp: payload };

    case RESET_ADD_RESTAURANT:
      return { ...state, addRestaurantResp: payload };

    case ADD_RESTAURANT_SUCCESS:
      return { ...state, addRestaurantResp: payload };
    // case ADD_RESTAURANT_FAILURE:
    //   return { ...state, error: payload };

    case EDIT_RESTAURANT_SUCCESS:
      return { ...state, editRestaurantResp: payload };

    case RESET_EDIT_RESTAURANT:
      return { ...state, editRestaurantResp: payload };

    case DELETE_RESTAURANT_SUCCESS:
      return { ...state, deleteRestaurantResp: payload };

    case RESET_DELETE_RESTAURANT:
      return { ...state, deleteRestaurantResp: payload };

    default:
      return state;
  }
};