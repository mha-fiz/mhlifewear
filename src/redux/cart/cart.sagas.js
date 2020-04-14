import { all, call, put, takeLatest } from "redux-saga/effects";
import UserActionTypes from "../user/user.types";
import { clearCart } from "./cart.actions";

//* Worker Sagas
export function* clearCartOnSignOut() {
  yield put(clearCart());
}

//* Watcher Sagas
export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut);
}

//* All Sagas
export function* cartSagas() {
  yield all([call(onSignOutSuccess)]);
}
