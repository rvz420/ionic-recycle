import { LoadingState } from "./LoadingState";
import { hide, show } from "./loading.actions";
import { loadingReducer } from "./loading.reducers";
import  { createAction} from "@ngrx/store";

describe('Loading store' , () => {
  it('show', () => {
    const intialState : LoadingState = {show: false};
    const newState = loadingReducer(intialState,show());
    expect(newState). toEqual({show: true});
  })

  it('hide', () => {
      const intialState : LoadingState = {show: true};
      const newState = loadingReducer(intialState,hide());
      expect(newState). toEqual({show: false});
    })

    it('should keep state if action is unknow ', () => {
      const intialState : LoadingState = {show: true};
      const action = createAction("unknown");
      const newState = loadingReducer(intialState,action);
      expect(newState). toEqual({show: true});
    })
})
