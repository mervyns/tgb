import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import Layout from '../components/Layout'

export const GalleryPostTemplate = ({
  description,
  galleryImage,
  alt,
  tags,
  title,
  helmet,
}) => {
  return (
    <section className="section">
      {helmet || ''}
      <div className="container content">
          <h2>{title}</h2>
          <img src={galleryImage} alt={alt}/>
          <h4>{description}</h4>
      </div>
    </section>
  )
}

GalleryPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  galleryImage: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const GalleryPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <GalleryPostTemplate
        description={post.frontmatter.description}
        galleryImage={post.frontmatter.galleryImage}
        alt={post.frontmatter.alt}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.frontmatter.title}`}</title>
            <meta
              name="description"
              content={`${post.frontmatter.description}`}
            />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
      />
    </Layout>
  )
}

GalleryPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default GalleryPost

export const pageQuery = graphql`
  query GalleryPostByID($id: String!) {
    markdownRemark(id: {eq: $id}) {
        id
        frontmatter {
          galleryImage
          alt
          description
          title
          tags
        }
      }
  }
`