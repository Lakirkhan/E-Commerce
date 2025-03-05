import { ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, UPDATE_QUANTITY, SET_CART } from "./constant";
import { USER_LOGOUT, SET_USER, AUTH_ERROR, USER_SIGNUP } from "./constant";
import { ADD_ORDER, SET_ORDERS, SET_USERS } from "./constant";



const initialState = {
  cartData: [],
};

export const cartData = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const existingProductIndex = state.findIndex(item => item.id === action.payload.id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...state];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      }
      return [...state, { ...action.payload, quantity: 1 }];
    case REMOVE_FROM_CART:
      return state.filter((item) => item.id !== action.payload);
    case EMPTY_CART:
      return [];
    case UPDATE_QUANTITY:
      return state.map(item =>
        item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
      );
    case SET_CART:
      return action.payload
    default:
      return state;
  }
};


const State = {
  users: [],
  user: null,
  isAdmin: false,
  orders: [],
  error: null,
};


export const authReducer = (state = State, action) => {
  switch (action.type) {
    case USER_SIGNUP:
      return { ...state, users: [...state.users, action.payload], error: null };

    case SET_USERS:
      return { ...state, users: action.payload, error: null };

    case SET_USER:
      return { ...state, user: action.payload, isAdmin: action.payload.role === "admin", error: null };

    case USER_LOGOUT:
      return { ...state, user: null, orders: [] };

    case AUTH_ERROR:
      return { ...state, error: action.payload };

    case ADD_ORDER:
      const updatedOrders = Array.isArray(state.orders) ? [...state.orders, action.payload] : [action.payload];
      return {
        ...state,
        orders: updatedOrders,
      };

    case SET_ORDERS:
      return { ...state, orders: Array.isArray(action.payload) ? action.payload : [] };

    default:
      return state;
  }
};


