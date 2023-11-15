export const GLOBALS = `#graphql
  query Globals {
    Footer {
      faqs {
        question
        answer
      }
      linkGroups {
        heading
        links {
          text
          type
          relationship {
            value {
              ... on Page {
                slug
                breadcrumbs {
                  url
                  label
                }
              }
            }
          }
          anchor
          url
          rel
          newTab
        }
      }
      marquee
      copyright
    }
    Navigation {
      links {
        text
        type
        relationship {
          value {
            ... on Page {
              slug
              breadcrumbs {
                url
                label
              }
            }
          }
        }
        anchor
        url
        rel
        newTab
      }
      callToAction {
        variant
        size
        icon
        iconPosition
        link {
          text
          type
          relationship {
            value {
              ... on Page {
                slug
                breadcrumbs {
                  url
                  label
                }
              }
            }
          }
          anchor
          url
          rel
          newTab
        }
      }
    }
  }
`;
