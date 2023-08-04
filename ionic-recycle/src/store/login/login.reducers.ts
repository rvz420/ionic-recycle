import { createReducer, on } from "@ngrx/store";
import { LoginState } from "./LoginState";
import { recoveredPassword, recoveredPasswordFail, recoveredPasswordSuccess } from "./login.actions";

const initialState: LoginState = {
  error: null,
  isLoggedIn: false,
  isLoggingIn: false,
  isRecoveredPassword: false,
  isRecoveringPassword: false
}

const reducer = createReducer(initialState,
    on(recoveredPassword, currentState => {
      return currentState;
    }),
    on(recoveredPasswordSuccess, currentState => {
      return currentState;
    }),
    on(recoveredPasswordFail, currentState => {
      return currentState;
    })
  )
export function loginReducer(state: LoginState, action: any){
  return reducer(state,action);
}
