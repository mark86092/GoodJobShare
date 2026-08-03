export const getPopularExperiencesQuery = /* GraphQL */ `
  {
    popular_experiences(returnNumber: 3) {
      id
      __typename
      type
      created_at
      title
      preview
      job_title {
        name
      }
      originalCompanyName
      company {
        name
      }
      like_count
      reply_count
    }
  }
`;
