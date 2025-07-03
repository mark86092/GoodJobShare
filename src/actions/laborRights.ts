import { Thunk } from 'reducers';
import laborRightsReducers, { SET_MENU, SET_ENTRY } from 'reducers/laborRights';
import {
  queryLaborRightsMenu as queryMenuApi,
  queryLaborRights as queryEntryApi,
} from 'apis/laborRightsApi';
import { getError, getFetched, toFetching, isUnfetched } from 'utils/fetchBox';
import {
  menuBoxSelector,
  entryBoxSelectorById,
} from 'selectors/laborRightsSelector';
import { isGraphqlError, UiNotFoundError } from 'utils/errors';

const setMenu = laborRightsReducers.builders[SET_MENU];

const setEntry = laborRightsReducers.builders[SET_ENTRY];

const queryMenu = (): Thunk => async (dispatch): Promise<unknown> => {
  dispatch(setMenu({ menu: toFetching() }));

  try {
    const entries = await queryMenuApi();
    return dispatch(setMenu({ menu: getFetched(entries) }));
  } catch (error) {
    dispatch(setMenu({ menu: getError(error) }));
    throw error;
  }
};

export const queryMenuIfUnfetched = (): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
  const box = menuBoxSelector(getState());
  if (isUnfetched(box)) {
    return dispatch(queryMenu());
  }
};

const queryEntry = (entryId: string): Thunk => async (
  dispatch,
): Promise<unknown> => {
  dispatch(setEntry({ entryId, entry: toFetching() }));

  try {
    const entry = await queryEntryApi({ entryId });
    return dispatch(setEntry({ entryId, entry: getFetched(entry) }));
  } catch (error) {
    // @ts-ignore
    if (isGraphqlError('GraphqlError')) {
      return dispatch(
        setEntry({ entryId, entry: getError(new UiNotFoundError()) }),
      );
    }

    // unexpected error
    throw error;
  }
};

export const queryEntryIfUnfetched = (entryId: string): Thunk => async (
  dispatch,
  getState,
): Promise<unknown> => {
  const box = entryBoxSelectorById(entryId)(getState());
  if (isUnfetched(box)) {
    return dispatch(queryEntry(entryId));
  }
};
