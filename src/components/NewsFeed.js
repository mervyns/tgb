import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import { List, Row, Col } from 'antd';
import styled from 'styled-components';
import Img from 'gatsby-image';

class Newsfeed extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <React.Fragment>
        <Heading>Latest News from Around the World</Heading>
        {posts &&
          posts.map(({ node: post }) => (
            <Container>
              {post.frontmatter.featuredimage ? (
                <Image>
                  <Img
                    fixed={post.frontmatter.featuredimage.childImageSharp.fixed}
                    alt={post.frontmatter.featuredimage.childImageSharp.alt}
                  />
                </Image>
              ) : null}
              <TitleContainer>
                <NewsFeedTitle>
                  <Link to={post.fields.slug}>{post.frontmatter.title}</Link>
                </NewsFeedTitle>
                <NewsFeedDate>{post.frontmatter.date}</NewsFeedDate>
                <p>
                  {post.excerpt}
                  <br />
                  <Link className='button' to={post.fields.slug}>
                    Keep Reading →
                  </Link>
                </p>
              </TitleContainer>
            </Container>
          ))}
      </React.Fragment>
    );
  }
}

const Container = styled.div`
  border-bottom: 2px solid #999;
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const Heading = styled.h1`
  font-size: 1.3em;
`;

const TitleContainer = styled.div`
  flex: 1;
`;

const NewsFeedTitle = styled.h1`
  font-size: 1.3em;
  a {
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`;

const Image = styled.div`
  width: 20vw;
  max-width: 250px;
  margin-right: 20px;
`;

const NewsFeedDate = styled.span`
  font-size: 0.8em;
  color: #000;
  :after {
    display: inline;
    content: '▪';
    margin: 0 5px;
  }
`;

Newsfeed.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default () => (
  <StaticQuery
    query={graphql`
      query NewsFeedQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "news-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
                featuredpost
                featuredimage {
                  childImageSharp {
                    fixed(width: 200, height: 200) {
                      ...GatsbyImageSharpFixed
                    }
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <Newsfeed data={data} count={count} />}
  />
);
