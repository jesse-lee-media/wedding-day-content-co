export const PAGES = `#graphql
  query Pages {
    Pages(limit: 500) {
      docs {
        slug
      }
    }
  }
`;
