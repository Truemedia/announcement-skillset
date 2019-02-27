const query = require('./../../bindings/gridsome/strapi/posts.graphql');

/**
  * @return {Promise}
  */
module.exports = function(service, templater)
{
  return service.request(query).then(data => {
    let latestPosts = data.posts.edges.sort( function(a,b){
      return new Date(b.date) - new Date(a.date);
    });
    let latestPost = latestPosts.shift();
    return templater.tpl('post', {
      post: latestPost.node
    }).compile();
  }).then(content => content.body)
    .catch(err => console.error(err));
};
