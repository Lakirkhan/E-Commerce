import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import productSaga from "./productSaga";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


const sagaMiddleware = createSagaMiddleware();
const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(productSaga);
export const persistor = persistStore(store);
export default store;
