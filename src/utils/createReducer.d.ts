import { Reducer, AnyAction } from 'redux';

type HandlersMap<S, T extends Record<string, unknown>> = {
  [K in keyof T]: (state: S, action: T[K]) => S;
};

type CreateReducer<S, T extends Record<string, unknown>> = Reducer<
  S,
  AnyAction
> & {
  builders: {
    [K in keyof T]: (param: T[K]) => Action<string> & T[K];
  };
};

declare function createReducer<S, T extends Record<string, unknown>>(
  initialState: S,
  handlers: HandlersMap<S, T>,
  {
    resetOnLogOut = true,
  }: {
    resetOnLogOut?: boolean;
  } = {},
): CreateReducer<S, T>;

export = createReducer;
