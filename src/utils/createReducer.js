import { mapObjIndexed } from 'ramda';
import { LOG_OUT } from 'actions/auth';

const createReducer = (
  initialState,
  handlers,
  { resetOnLogOut = true } = {},
) => {
  const func = (state = initialState, action) => {
    const reduceFn = handlers[action.type];
    if (resetOnLogOut && action.type === LOG_OUT) return initialState;
    return reduceFn ? reduceFn(state, action) : state;
  };

  func.builders = mapObjIndexed(
    (num, key) => param => ({ type: key, ...param }),
    handlers,
  );

  return func;
};

export default createReducer;
