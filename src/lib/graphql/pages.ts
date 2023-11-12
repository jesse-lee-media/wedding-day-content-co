export const PAGE = `#graphql
  query Page($slug: String) {
    Pages(where: { slug: { equals: $slug } }) {
      docs {
        title
        description
        content
        title
        parent {
          ... on Page {
            title
            slug
          }
        }
        breadcrumbs {
          url
          label
        }
      }
    }
  }
`;

export const PAGES = `#graphql
  query Pages {
    Pages(limit: 500) {
      docs {
        slug
      }
    }
  }
`;
