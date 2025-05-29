import { Reducer, Action } from 'redux';

type HandlersMap<S, A extends Action = Action> = {
  [key: string]: (state: S, action: A<unknown>) => S;
};

declare function createReducer<S, A extends Action>(
  initialState: S,
  handlers: HandlersMap<S, A>,
  {
    resetOnLogOut = true,
  }: {
    resetOnLogOut?: boolean;
  } = {},
): Reducer<S, A>;

export = createReducer;
