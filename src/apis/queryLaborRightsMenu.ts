import graphqlClient from 'utils/graphqlClient';
import { LaborRightMenuEntry } from 'reducers/laborRights';

const query = /* GraphQL */ `
  query {
    labor_rights {
      id
      title
      coverUrl
    }
  }
`;

const queryLaborRightsMenu = (): Promise<LaborRightMenuEntry[]> =>
  graphqlClient<{
    labor_rights: LaborRightMenuEntry[];
  }>({
    query,
  }).then(data => data.labor_rights);

export default queryLaborRightsMenu;
