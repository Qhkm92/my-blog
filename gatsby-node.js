const path = require(`path`);
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const blogPost = path.resolve(`./src/templates/blog-post.js`);
  const categoriesPost = path.resolve("./src/templates/category-list.js");
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 1000
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                categories
              }
            }
          }
        }
      }
    `
  );
  if (result.errors) {
    throw result.errors;
  }
  const allMarkdownRemark = result.data.allMarkdownRemark;

  // Create blog posts pages.
  const posts = allMarkdownRemark.edges;
  const listOfCategories = dedupeCategories(allMarkdownRemark);

  // create categories page
  listOfCategories.forEach((category) => {
    reporter.info(`Creating page: category/${category}`);

    const filteredIds = allMarkdownRemark.edges.filter(({ node }) => {
      if (node.frontmatter.categories !== null) {
        return node.frontmatter.categories.includes(category);
      }
    });
    console.info(filteredIds);
    const ids = filteredIds.map(({ node }) => node.id);
    createPage({
      path: `category/${category}`,
      component: categoriesPost,
      // Create props for our CategoryList.js component
      context: {
        category,
        // Create an array of ids of articles in this category
        ids: ids,
      },
    });
  });

  // create post pages
  posts.forEach((post, index) => {
    const previous = index === posts.length - 1 ? null : posts[index + 1].node;
    const next = index === 0 ? null : posts[index - 1].node;

    createPage({
      path: post.node.fields.slug,
      component: blogPost,
      context: {
        slug: post.node.fields.slug,
        previous,
        next,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};

function dedupeCategories(allMarkdownRemark) {
  const uniqueCategories = new Set();
  // Iterate over all articles
  allMarkdownRemark.edges.forEach(({ node }) => {
    // Iterate over each category in an article
    if (node.frontmatter.categories !== null) {
      node.frontmatter.categories.forEach((category) => {
        if (category !== null) {
          uniqueCategories.add(category);
        }
      });
    }
  });
  // Create new array with duplicates removed
  return Array.from(uniqueCategories);
}
