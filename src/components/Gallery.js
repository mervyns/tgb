import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import PreviewCompatibleImage from './PreviewCompatibleImage';

class Gallery extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;
    console.log(data);

    return (
      <div className='columns is-multiline'>
        {posts &&
          posts.map(({ node: post }) => (
            <div className='is-parent column is-6' key={post.id}>
              <Link to={post.fields.slug}>
                <span>{post.frontmatter.description}</span>
                <img src={post.frontmatter.galleryImage} alt={post.frontmatter.alt} />
              </Link>
              <span>{post.frontmatter.tags}</span>
            </div>
          ))}
      </div>
    );
  }
}

Gallery.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query MyQuery {
        allMarkdownRemark(
          filter: { frontmatter: { templateKey: { eq: "gallery-post" } } }
        ) {
          edges {
            node {
              frontmatter {
                galleryImage
                tags
                alt
                description
              }
              id
              fields {
                slug
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Gallery data={data} count={count} />}
  />
);
