import graphqlClient from 'utils/graphqlClient';
import { LaborRightEntry } from 'reducers/laborRights';

const query = /* GraphQL */ `
  query($id: ID!) {
    labor_right(id: $id) {
      id
      title
      order
      description
      content
      seoTitle
      seoDescription
      seoText
      coverUrl
      nPublicPages
      descriptionInPermissionBlock
    }
  }
`;

const queryLaborRights = ({
  entryId,
}: {
  entryId: string;
}): Promise<LaborRightEntry> =>
  graphqlClient<{
    labor_right: LaborRightEntry;
  }>({
    query,
    variables: {
      id: entryId,
    },
  }).then(data => data.labor_right);

export default queryLaborRights;
