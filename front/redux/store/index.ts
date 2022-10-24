import { configureStore, combineReducers } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import logger from "redux-logger";

import testSlice from "../slice/testSlice";
import postSlice from "../slice/postSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage
};

const rootReducer = combineReducers({
  test: testSlice,
  post: postSlice
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
      // }).concat(logger),
    }).concat(logger)
});
export const persistor = persistStore(store);
export default store;
