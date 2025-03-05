import {
  USER_LOGIN, USER_LOGOUT, USER_SIGNUP, SET_USER, AUTH_ERROR, SET_CART,
  ADD_TO_CART, REMOVE_FROM_CART, EMPTY_CART, PRODUCT_LIST, UPDATE_QUANTITY,
  PRODUCT_LIST_HOMEPAGE, ADD_ORDER, SET_USERS, DELETE_USER
} from "./constant";

import { toast } from "react-toastify";

let usersArray = [];

export const adminLogin = (adminData, navigate) => {
  return (dispatch, getState) => {
    const users = getState().auth.users;

    const admin = users.find(
      (user) => user.email === adminData.email && user.password === adminData.password && user.role === "admin"
    );

    if (!admin) {
      toast.error("Invalid Admin Credentials!", { position: "top-center", autoClose: 1000 });
      dispatch({ type: AUTH_ERROR, payload: "Invalid Admin Credentials!" });
      return;
    }

    dispatch({ type: SET_USER, payload: admin });
    toast.success("Admin login successful!", { position: "top-center", autoClose: 1000 });
    navigate("/admin/dashboard");
  };
};


export const loginUser = (userData, navigate) => {
  return (dispatch, getState) => {
    const users = getState().auth.users;

    const existingUser = users.find(
      (user) => user.email === userData.email && user.password === userData.password
    );

    if (!existingUser) {
      toast.error("Invalid Credentials! Please check your email or password.", { position: "top-center", autoClose: 1000 });
      dispatch({ type: AUTH_ERROR, payload: "Invalid Credentials!" });
      return;
    }

    dispatch({ type: SET_USER, payload: existingUser });
    dispatch({ type: SET_CART, payload: existingUser.cart || [] });

    toast.success("Login successful!", { position: "top-center", autoClose: 1000 });
    navigate(existingUser.role === "admin" ? "/admin" : "/");
  };
};


/** 🔹 User Signup **/
export const signupUser = (userData) => {
  return (dispatch, getState) => {
    const users = getState().auth.users || [];
    const userExists = users.some((user) => user.email === userData.email);

    if (userExists) {
      toast.error("User already exists! Try another email.");
      dispatch({ type: AUTH_ERROR, payload: "User already exists!" });
      return;
    }

    const newUser = { ...userData, cart: [], role: "user" };
    const updatedUsers = [...users, newUser];

    dispatch({ type: SET_USERS, payload: updatedUsers });
    toast.success("Signup successful! Please log in.", { position: "top-center", autoClose: 1000 });
  };
};


/** 🔹 Logout **/
export const logoutUser = () => {
  return (dispatch, getState) => {
    const { auth, cartData } = getState();

    const updatedUsers = getState().auth.users.map((user) =>
      user.email === auth.user.email ? { ...user, cart: cartData } : user
    );

    dispatch({ type: SET_USERS, payload: updatedUsers });
    dispatch({ type: USER_LOGOUT });
    dispatch({ type: SET_CART, payload: [] });

    toast.info("Logged out successfully.", { position: "top-center", autoClose: 1000 });
  };
};


/** 🔹 Fetch Users (Admin) **/
export const fetchUsers = () => {
  return (dispatch, getState) => {
    dispatch({ type: SET_USERS, payload: getState().auth.users });
  };
};


/** 🔹 Delete User (Admin) **/
export const deleteUser = (userId) => {
  return (dispatch) => {
    usersArray = usersArray.filter((user) => user.id !== userId);
    dispatch({ type: DELETE_USER, payload: userId });
    toast.success("User deleted successfully!", { position: "top-center", autoClose: 1000 });
  };
};

/** 🔹 Cart Actions **/
export const addToCart = (product) => {
  return (dispatch, getState) => {
    const { auth, cartData } = getState();

    if (!auth.user) {
      toast.error("Please login first!", { position: "top-center", autoClose: 1000 });
      return;
    }

    const existingProduct = cartData.find((item) => item.id === product.id);
    if (existingProduct) {
      toast.info("This product is already in your cart!", { position: "top-center", autoClose: 1000 });
      return;
    }

    dispatch({ type: ADD_TO_CART, payload: product });
    toast.success("Product added to cart!", { position: "top-center", autoClose: 1000 });
  };
};

export const removeFromCart = (productId) => ({ type: REMOVE_FROM_CART, payload: productId });
export const emptyCart = () => ({ type: EMPTY_CART });
export const getProductList = () => ({ type: PRODUCT_LIST });
export const getProductListHomepage = () => ({ type: PRODUCT_LIST_HOMEPAGE });
export const updateQuantity = (id, quantity) => ({ type: UPDATE_QUANTITY, payload: { id, quantity } });


export const addOrder = (order) => (dispatch, getState) => {
  const { orders } = getState().auth;
  const updatedOrders = Array.isArray(orders) ? [...orders, order] : [order];
  dispatch({ type: ADD_ORDER, payload: updatedOrders });
};




