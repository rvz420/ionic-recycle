import { createReducer, on } from "@ngrx/store";
import { LoginState } from "./LoginState";
import { login, loginFail, loginSuccess, recoveredPassword, recoveredPasswordFail, recoveredPasswordSuccess } from "./login.actions";
import { AppInitialState } from "../AppInitialState";

const initialState: LoginState = AppInitialState.login;

const reducer = createReducer(initialState,
    on(recoveredPassword, currentState => {
      return {
        ...currentState,
        error: null,
        isRecoveredPassword: false,
        isRecoveringPassword: true
      }

    }),
    on(recoveredPasswordSuccess, currentState => {
      return {
        ...currentState,
        error: null,
        isRecoveredPassword: true,
        isRecoveringPassword: false
      }

    }),
    on(recoveredPasswordFail, (currentState, action) => {
      return {
        ...currentState,
        error: action.error,
        isRecoveredPassword: false,
        isRecoveringPassword: false
      }

    }),
    on(login, (currentState, action) => {
      return {
        ...currentState,
        isLoggedIn: false,
        isLoggingIn: true
      }

    }),
    on(loginSuccess, (currentState, action) => {
      return {
        ...currentState,
        isLoggedIn: true,
        isLoggingIn: false
      }

    }),
    on(loginFail, (currentState, action) => {
      return {
        ...currentState,
        error: action.error,
        isLoggedIn: false,
        isLoggingIn: false
      }

    }),
  )
export function loginReducer(state: LoginState, action: any){
  return reducer(state,action);
}
