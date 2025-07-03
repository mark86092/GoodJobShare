import { LOG_OUT } from 'actions/auth';
import { Reducer, Action as ReduxAction } from 'redux';

type ActionParams = Record<string, unknown>;

export type Action = ReduxAction<string> & ActionParams;

type HandlersMap<S, T extends Record<string, ActionParams>> = {
  [K in keyof T]: (state: S, action: T[K]) => S;
};

type CreateReducer<S, T extends Record<string, ActionParams>> = Reducer<
  S,
  Action
> & {
  builders: {
    [K in keyof T]: (param: T[K]) => ReduxAction<string> & T[K];
  };
};

const createReducer = <S, T extends Record<string, ActionParams>>(
  initialState: S,
  handlers: HandlersMap<S, T>,
  {
    resetOnLogOut = true,
  }: {
    resetOnLogOut?: boolean;
  } = {},
): CreateReducer<S, T> => {
  const func: CreateReducer<S, T> = (state: S = initialState, action) => {
    const reduceFn = handlers[action.type];
    if (resetOnLogOut && action.type === LOG_OUT) return initialState;
    // @ts-ignore
    return reduceFn ? reduceFn(state, action) : state;
  };

  const result = {} as {
    [K in keyof T]: (param: T[K]) => ReduxAction<string> & T[K];
  };
  for (const key in handlers) {
    result[key] = (
      param: T[typeof key],
    ): ReduxAction<string> & T[typeof key] => ({
      type: key,
      ...param,
    });
  }

  func.builders = result;

  return func;
};

export default createReducer;
