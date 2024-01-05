import {
  ADD_TO_FAV,
  CURRENT_CHAT,
  LOG_IN,
  LOG_OUT,
  REMOVE_FROM_FAV,
  SELECTED,
} from "./userTypes";

const initialState = {
  user: JSON.parse(localStorage.getItem("user")),
  selected: "",
  currentChat: null,
  fav: [],
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return { ...state, user: action.user };
    case LOG_OUT:
      return {
        ...state,
        user: null,
      };
    case SELECTED:
      return {
        ...state,
        selected: action.selected,
      };
    case CURRENT_CHAT:
      return {
        ...state,
        currentChat: action.currentChat,
      };
    case ADD_TO_FAV:
      return {
        ...state,
        fav: [...state.fav, action.payload],
      };
    case REMOVE_FROM_FAV:
      const index = state.fav.findIndex(
        (item) => item.details._id === action._id
      );
      let newFav = [...state.fav];
      if (index >= 0) {
        newFav.splice(index, 1);
      } else {
        console.log("cannot remove");
      }
      return {
        ...state,
        fav: newFav,
      };
    default:
      return state;
  }
};
