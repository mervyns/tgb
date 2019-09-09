import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql, StaticQuery } from 'gatsby';
import { List, Row, Col } from 'antd';
import styled from 'styled-components';
import Img from 'gatsby-image';

class AdBanner extends React.Component {
  render() {
    console.log(this.props);
    return (
      <Container>
        <StyledLink href={this.props.link}>
          <ImgStyled src={this.props.src} />
        </StyledLink>
      </Container>
    );
  }
}

const Container = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  display: flex;
  justify-content: center;
`;

const StyledLink = styled.a`
  display: flex;
  align-content: center;
`;

const ImgStyled = styled.img`
  display: flexbox;
  max-height: 350px;
  height: auto;
  max-width: 640px;
  width: auto;
  margin: auto;
`;

AdBanner.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export default AdBanner;
