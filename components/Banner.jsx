import React from 'react';
import styled from 'styled-components';
import SbEditable from 'storyblok-react';

const BannerContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 5rem 2rem;
  background: ${props => props.theme.surfaceColor};
  
  @media (max-width: 768px) {
    flex-direction: column;
    padding: 3rem 1rem;
  }
`;

const BannerContent = styled.div`
  flex: 1;
  padding-right: 2rem;
  
  @media (max-width: 768px) {
    padding-right: 0;
    padding-bottom: 2rem;
    text-align: center;
  }
`;

const BannerTitle = styled.h1`
  font-size: 3.5rem;
  font-weight: 700;
  color: ${props => props.theme.headingColor};
  margin-bottom: 1rem;
  
  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const BannerSubtitle = styled.h2`
  font-size: 1.8rem;
  font-weight: 400;
  color: ${props => props.theme.secondaryColor};
  margin-bottom: 2rem;
  
  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const BannerDescription = styled.p`
  font-size: 1.2rem;
  line-height: 1.6;
  color: ${props => props.theme.textColor};
  margin-bottom: 2rem;
`;

const BannerCTA = styled.a`
  display: inline-block;
  padding: 0.8rem 2rem;
  background: ${props => props.theme.primaryColor};
  color: white;
  font-weight: 600;
  border-radius: 4px;
  text-decoration: none;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${props => props.theme.accentColor};
    transform: translateY(-2px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  }
`;

const Banner = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <BannerContainer>
        <BannerContent>
          <BannerTitle>{blok.title || "Hi, I'm a Full Stack Developer"}</BannerTitle>
          <BannerSubtitle>{blok.subtitle || "Startup Speed. Enterprise-Grade Reliability."}</BannerSubtitle>
          <BannerDescription>
            {blok.description || "I build modern web applications with a focus on performance, scalability, and user experience. Let's create something amazing together."}
          </BannerDescription>
          <BannerCTA href={blok.cta_link || "#contact"}>
            {blok.cta_text || "Get in Touch"}
          </BannerCTA>
        </BannerContent>
      </BannerContainer>
    </SbEditable>
  );
};

export default Banner; 