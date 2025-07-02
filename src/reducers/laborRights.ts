import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import { SET_MENU, SET_ENTRY } from 'actions/laborRights';
import { LaborRightEntry, LaborRightMenuEntry } from 'graphql/laborRight';

const preloadedState: {
  entryById: Record<string, FetchBox<LaborRightEntry | null>>;
  menu: FetchBox<LaborRightMenuEntry[]>;
} = {
  entryById: {},
  menu: getUnfetched(),
};

const reducer = createReducer(
  preloadedState,
  {
    [SET_MENU]: (
      state,
      { menu }: { menu: FetchBox<LaborRightMenuEntry[]> },
    ) => ({
      ...state,
      menu,
    }),
    [SET_ENTRY]: (
      state,
      {
        entryId,
        entry,
      }: { entryId: string; entry: FetchBox<LaborRightEntry | null> },
    ) => {
      return {
        ...state,
        entryById: {
          ...state.entryById,
          [entryId]: entry,
        },
      };
    },
  },
  { resetOnLogOut: false },
);

// const handler = reducer.builders[SET_ENTRY];

export default reducer;
