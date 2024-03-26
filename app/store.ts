import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage";

import registerModalReducer from "../features/modal/registerModalSlice";
import loginModalReducer from "../features/modal/loginModalSlice";
import logoutModalReducer from "../features/modal/logoutModalSlice";
import editProfileModalReducer from "../features/modal/editProfileModalSlice";
import postModalReducer from "../features/modal/postModalSlice";
import confirmModalReducer from "../features/modal/confirmModalSlice";
import deletePostOrCommentConfirmModalReducer from "../features/modal/deletePostOrCommentConfirmModalSlice";
import deleteAccountModalReducer from "../features/modal/deleteAccountModalSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: [],
  blacklist: ["registerModal", "loginModal", "logoutModal", "editProfileModal", "deletePostOrCommentConfirmModal", "deleteAccountModal", "postModal", "confirm"],
};

const rootReducer = combineReducers({
  registerModal: registerModalReducer,
  loginModal: loginModalReducer,
  logoutModal: logoutModalReducer,
  editProfileModal: editProfileModalReducer,
  postModal: postModalReducer,
  confirmModal: confirmModalReducer,
  deletePostOrCommentConfirmModal: deletePostOrCommentConfirmModalReducer,
  deleteAccountModal: deleteAccountModalReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistor = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
