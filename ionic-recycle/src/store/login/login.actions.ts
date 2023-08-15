import { createAction, props } from "@ngrx/store";
import { User } from "src/app/model/user/User";

export const recoveredPassword = createAction("[Recover password]", props<{email: string}>());
export const recoveredPasswordSuccess = createAction("[Recover password] success");
export const recoveredPasswordFail = createAction("[Recover password] fail",props<{error: any}>());


export const login = createAction("[Login]", props<{email: string, password: string}>());
export const loginSuccess = createAction("[Login] success", props<{user: User}>());
export const loginFail = createAction("[Login] fail", props<{error: any}>());
