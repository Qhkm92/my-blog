// CategoryList.js
import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/layout";

const CategoryList = ({
  pageContext: { category },
  data: { allMarkdownRemark, site },
  location,
}) => {
  const siteTitle = site.siteMetadata.title;

  return (
    <Layout path={location} title={siteTitle}>
      <div>
        <h1>{category} Articles</h1>
        <ul>
          {allMarkdownRemark.edges.map(({ node }) => {
            return (
              <li key={node.frontmatter.title}>
                <Link to={`${node.fields.slug}`}>{node.frontmatter.title}</Link>
                <div>
                  <time>{node.frontmatter.date}</time>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </Layout>
  );
};

export const query = graphql`
  query CategoryListQuery($ids: [String]!) {
    site {
      siteMetadata {
        title
        author
      }
    }
    allMarkdownRemark(filter: { id: { in: $ids } }) {
      edges {
        node {
          fields {
            slug
          }
          frontmatter {
            title
            date(formatString: "MMM D, YYYY")
          }
        }
      }
    }
  }
`;
export default CategoryList;
