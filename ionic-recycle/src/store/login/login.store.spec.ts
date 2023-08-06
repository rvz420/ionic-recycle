import { User } from "src/app/model/user/User";
import { AppInitialState } from "../AppInitialState";
import { LoginState } from "./LoginState";
import { login, loginFail, loginSuccess, recoveredPassword, recoveredPasswordFail, recoveredPasswordSuccess } from "./login.actions";
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
  it('login', () => {
    const initialState: LoginState = AppInitialState.login;
    const newState = loginReducer(initialState, login());

    expect(newState).toEqual({
      ...initialState,
      error: null,
      isLoggedIn: false,
      isLoggingIn: true
    })
  });

  it('loginSuccess', () => {
    const initialState: LoginState = {
      ...AppInitialState.login,
      isLoggingIn: true

    }
    const user : User = new User();
    user.id = "anyId";
    const newState = loginReducer(initialState, loginSuccess({user}));

    expect(newState).toEqual({
      ...initialState,
      isLoggedIn: true,
      isLoggingIn: false
    })
  });

  it('loginFail', () => {
    const initialState: LoginState = {
      ...AppInitialState.login,
      isLoggingIn: true

    }
    const error = {error: "error"}
    const newState = loginReducer(initialState, loginFail({error}));

    expect(newState).toEqual({
      ...initialState,
      error,
      isLoggedIn: false,
      isLoggingIn: false
    })
  });

})
