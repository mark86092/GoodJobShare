import { RootState } from 'reducers';
import FetchBox from 'utils/fetchBox';
import { AspectStatisticsData } from 'apis/aspectRatingStatistics';
import { AspectExperiencesData } from 'components/CompanyAndJobTitle/WorkExperiences/Aspects';

export declare function companyWorkExperiencesAspectStatisticsBoxSelectorByName(
  companyName: string,
): (state: RootState) => FetchBox<AspectStatisticsData>;

export declare function companyWorkExperiencesAspectExperiencesBoxSelectorByName(
  companyName: string,
): (state: RootState) => FetchBox<AspectExperiencesData>;
