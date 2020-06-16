import React from 'react'
import { graphql } from 'gatsby'
import { HelmetDatoCms } from 'gatsby-source-datocms'
import Img from 'gatsby-image'
import Layout from "../components/layout"

const Leaderboard = ({ data: { leaderboard } }) => (
  <Layout>
    <article className="sheet">
      <HelmetDatoCms seo={leaderboard.seoMetaTags} />
      <div className="sheet__inner">
        <h1 className="sheet__title">{leaderboard.title}</h1>
        <p className="sheet__lead">{leaderboard.subtitle}</p>
        <div className="sheet__gallery">
          <Img fluid={leaderboard.photo.fluid} />
        </div>
        <div
          className="sheet__body"
          dangerouslySetInnerHTML={{
            __html: leaderboard.bioNode.childMarkdownRemark.html,
          }}
        />
      </div>
    </article>
  </Layout>
)

export default Leaderboard

export const query = graphql`
  query LeaderboardQuery {
    leaderboard: datoCmsLeaderboardPage {
      seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      subtitle
      photo {
        fluid(maxWidth: 600, imgixParams: { fm: "jpg", auto: "compress" }) {
          ...GatsbyDatoCmsSizes
        }
      }
      bioNode {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
