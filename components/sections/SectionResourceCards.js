// Component for displaying the Section Header.
import React, { Component } from 'react';
import styled from 'styled-components';
import SbEditable from 'storyblok-react';
import ResourceCards from '../common/ResourceCards';


const SectionResourceCards = ({ settings, blok }) => {
  const cards = blok.type === 'personal-projects' 
    ? settings.content.project_cards 
    : blok.type === 'portfolio'
      ? settings.content.portfolio
      : [];
      
  return (
    <SbEditable content={blok}>
      <StyledResourcelCardsSection className="dark">
        <StyledContainer className="l-page">
          <StyledHeader>
            <h2>{blok.heading}</h2>
            <p>{blok.description}</p>
          </StyledHeader>

          <ResourceCards cards={cards} />
        </StyledContainer>
      </StyledResourcelCardsSection>
    </SbEditable>
  );
};

export default SectionResourceCards;

const StyledResourcelCardsSection = styled.section`
  color: white;
`;

const StyledContainer = styled.div`

*::-webkit-scrollbar {
    height: 15px;
  }

  *::-webkit-scrollbar-thumb {
    background: #0f0b18;
    border-radius: 10px;
    box-shadow: inset 2px 2px 2px hsla(0,0%,100%,.25), inset -2px -2px 2px rgba(0,0,0,.25);
  }

`

const StyledHeader = styled.header`
  text-align: center;
  margin-bottom: 30px;
  color: white;
`
