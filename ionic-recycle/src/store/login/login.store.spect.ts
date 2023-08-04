import { LoginState } from "./LoginState";

describe("Login Store", () => {

  it('recoveredPassword', () => {
    const initialState: LoginState = {
      error: null,
      isLoggedIn: false,
      isLoggingIn: false,
      isRecoveredPassword: false,
      isRecoveringPassword: false
    }
    expect(true).toBeFalse();

  })
})
