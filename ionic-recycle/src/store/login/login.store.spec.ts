import { AppInitialState } from "../AppInitialState";
import { LoginState } from "./LoginState";
import { recoveredPassword, recoveredPasswordFail, recoveredPasswordSuccess } from "./login.actions";
import { loginReducer } from "./login.reducers";

describe("Login Store", () => {

  it('recoveredPassword', () => {
    const initialState: LoginState = AppInitialState.login;
    const newState = loginReducer(initialState, recoveredPassword());

    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRecoveredPassword: false,
      isRecoveringPassword: true
    })
  });

  it('recoveredPasswordSuccess', () => {
    const initialState: LoginState = AppInitialState.login;
    const newState = loginReducer(initialState, recoveredPasswordSuccess());

    expect(newState).toEqual({
      ...initialState,
      error: null,
      isRecoveredPassword: true,
      isRecoveringPassword: false
    })
  });
  it('recoveredPasswordFalse', () => {
    const initialState: LoginState = AppInitialState.login;
    const error = {error: 'error'};
    const newState = loginReducer(initialState, recoveredPasswordFail(error));

    expect(newState).toEqual({
      ...initialState,
      error: error.error,
      isRecoveredPassword: false,
      isRecoveringPassword: false
    })
  });
})
