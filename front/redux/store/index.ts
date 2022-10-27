import {
  configureStore,
  combineReducers,
  EnhancedStore,
  Store
} from "@reduxjs/toolkit";
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
import { createWrapper, MakeStore } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

import testSlice from "../slice/testSlice";
import counterSlice from "../slice/counterSlice";
import walkSlice from "../slice/walkSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage
};

const rootReducer = combineReducers({
  test: testSlice,
  counter: counterSlice,
  walk: walkSlice
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
    }).concat(logger),
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production"
});
const setupStore = (context: any): EnhancedStore => store;
const makeStore: MakeStore<any> = (context: any) => setupStore(context);
export const persistor = persistStore(store);
export const wrapper = createWrapper<Store>(makeStore);
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
