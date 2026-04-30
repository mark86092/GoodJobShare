import { Thunk } from 'reducers';

export declare const queryPopularExperiences: () => Thunk;
export declare const queryPopularExperiencesIfUnfetched: (
  experienceId: string,
) => Thunk;
