// Component for displaying the Section Header.
import React, { Component } from 'react';
import styled from 'styled-components';
import RichText from '../common/typography/Richtext';
import SbEditable from 'storyblok-react';
import SectionHeader from '../common/typography/SectionHeader';
import Tags from '../common/Tags';
import SummaryCard from '../common/SummaryCard';
import GlobalConstants from '../../styles/Global-Constants';

const handleIndexClick=(e) => {
  const bodyRect = document.body.getBoundingClientRect().top;
  const id = '#' + e.target.textContent;
  const element = document.getElementById(id);
  // Nav is absolutely positioned
  const top = element.getBoundingClientRect().top - bodyRect - GlobalConstants.navHeight - 10;
  window.scrollTo({top, behavior: 'smooth'});  
}

const SectionSummaryCards = ({ blok, settings }) => {
  return (
    <SbEditable content={blok}>
      <StyledSummaryCardsSection className="dark">
        <StyledContainer className="l-page">
          {/* Index */}
          <StyledIndex>
            <StyledList>{blok.cards.map((card) => 
              <li onClick={handleIndexClick} key={card.heading}>
                {card.heading}
              </li>
            )}
            </StyledList>
          </StyledIndex>

          {/* Cards */}
          <StyledCardsWrapper>
            {blok.cards.map((card) => (
              <SummaryCard settings={settings} id={card.heading} key={card.heading} card={card} />
            ))}
          </StyledCardsWrapper>
        </StyledContainer>
      </StyledSummaryCardsSection>
    </SbEditable>
  );
};

export default SectionSummaryCards;

const StyledSummaryCardsSection = styled.section`
  background: #000;
  color: white;
`;

const StyledContainer = styled.div`display: flex;`

const StyledIndex = styled.div`width: 30%;`;

const StyledList = styled.ul`
  position: sticky;
  top: ${GlobalConstants.navHeight + 20 + "px"};
  left: 0;

  li {
    color: white;
    cursor: pointer;
    padding: 4px 0;
    font-size: 1.125rem;
  }
`;

const StyledCardsWrapper = styled.div`width: 80%;`;
