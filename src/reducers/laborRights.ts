import createReducer from 'utils/createReducer';
import FetchBox, { getUnfetched } from 'utils/fetchBox';
import { LaborRightEntry, LaborRightMenuEntry } from 'graphql/laborRight';

export const SET_MENU = '@@LABOR_RIGHTS/SET_MENU';
export const SET_ENTRY = '@@LABOR_RIGHTS/SET_ENTRY';

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

export default reducer;
