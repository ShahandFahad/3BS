import { createStore } from "redux";
import { userReducer } from "./User/userReducer";

// A store which contain all the required states in
const store = createStore(userReducer);

export default store;
