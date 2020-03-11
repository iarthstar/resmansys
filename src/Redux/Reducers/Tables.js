import {
  GET_TABLES_SUCCESS,
  GET_TABLE_SUCCESS,
  ADD_TABLE_SUCCESS,
  EDIT_TABLE_SUCCESS,
  DELETE_TABLE_SUCCESS,
  RESET_ADD_TABLE,
  RESET_EDIT_TABLE,
  RESET_DELETE_TABLE
} from "../Types/Tables";

const initialState = {
  tablesResp: {},
  tableResp: {},
  addTableResp: {},
  editTableResp: {},
  deleteTableResp: {}
};

export default (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {

    case GET_TABLES_SUCCESS:
      return { ...state, tablesResp: payload };
    // case GET_TABLES_FAILURE:
    //   return { ...state, error: payload };

    case GET_TABLE_SUCCESS:
      return { ...state, tableResp: payload };
    // case GET_TABLE_FAILURE:
    //   return { ...state, TableDetailsResp: payload };

    case ADD_TABLE_SUCCESS:
      return { ...state, addTableResp: payload };

    case RESET_ADD_TABLE:
      return { ...state, addTableResp: payload };

    case RESET_EDIT_TABLE:
      return { ...state, editTableResp: payload };

    case EDIT_TABLE_SUCCESS:
      return { ...state, editTableResp: payload };

    case RESET_DELETE_TABLE:
      return { ...state, deleteTableResp: payload };

    case DELETE_TABLE_SUCCESS:
      return { ...state, deleteTableResp: payload };

    default:
      return state;
  }
};