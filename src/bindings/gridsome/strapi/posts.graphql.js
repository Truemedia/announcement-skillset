module.exports = `query allPosts {
  posts: allStrapiArticle {
    edges {
    	node {
        title,
        content,
        createdAt
      }
  	}
  }
}`;
