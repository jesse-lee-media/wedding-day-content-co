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
          icon
          iconPosition
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
        icon
        iconPosition
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
        link {
          text
          icon
          iconPosition
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
