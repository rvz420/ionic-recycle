import {createReducer,on} from "@ngrx/store";
import { show, hide } from "./loading.actions";
import { LoadingState } from "./LoadingState";

const initialState : LoadingState = {
  show: false

}

const reducer = createReducer(initialState,

  on(show, () => {
    return {show: true};
  }),
  on(hide, () => {
    return {show: false};
  })
);

export function loadingReducer(state: LoadingState, action: any){
  // invoca al metodo del reducer definido en las constantes con los parametros
  return reducer(state,action);
}
