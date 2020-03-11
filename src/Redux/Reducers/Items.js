import {
  GET_ITEMS_SUCCESS,
  GET_ITEM_SUCCESS,
  ADD_ITEM_SUCCESS,
  EDIT_ITEM_SUCCESS,
  DELETE_ITEM_SUCCESS,
  RESET_ADD_ITEM,
  RESET_EDIT_ITEM,
  RESET_DELETE_ITEM
} from "../Types/Items";

const initialState = {
  itemsResp: {},
  itemResp: {},
  addItemResp: {},
  editItemResp: {},
  deleteItemResp: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case GET_ITEMS_SUCCESS:
      return { ...state, itemsResp: payload };

    case GET_ITEM_SUCCESS:
      return { ...state, itemResp: payload };

    case ADD_ITEM_SUCCESS:
      return { ...state, addItemResp: payload };

    case RESET_ADD_ITEM:
      return { ...state, addItemResp: payload };

    case RESET_EDIT_ITEM:
      return { ...state, editItemResp: payload };

    case EDIT_ITEM_SUCCESS:
      return { ...state, editItemResp: payload };

    case RESET_DELETE_ITEM:
      return { ...state, deleteItemResp: payload };

    case DELETE_ITEM_SUCCESS:
      return { ...state, deleteItemResp: payload };

    default:
      return state;
  }
};