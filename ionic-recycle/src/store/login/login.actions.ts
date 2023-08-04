import { createAction, props } from "@ngrx/store";

export const recoveredPassword = createAction("[Recover password]");
export const recoveredPasswordSuccess = createAction("[Recover password] success");
export const recoveredPasswordFail = createAction("[Recover password] fail",props<{error: any}>());
