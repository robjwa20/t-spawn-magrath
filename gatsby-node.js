const path = require(`path`)
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allDatoCmsEvent {
          edges {
            node {
              slug
            }
          }
        }
      }
    `).then(result => {
      result.data.allDatoCmsEvent.edges.map(({ node: event }) => {
        createPage({
          path: `events/${event.slug}`,
          component: path.resolve(`./src/templates/event.js`),
          context: {
            slug: event.slug,
          },
        })
      })
      resolve()
    })
  })
}
