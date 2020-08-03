// Component for displaying the Section Header.
import React, { Component } from 'react';
import styled from 'styled-components';
import RichText from '../common/typography/Richtext';
import SbEditable from 'storyblok-react';
import SectionHeader from '../common/typography/SectionHeader';
import Tags from '../common/Tags';
import SummaryCard from '../common/SummaryCard';

const SectionSummaryCards = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <StyledSummaryCardsSection>
        <StyledContainer className="l-page">
          {/* Index */}
          <StyledIndex>
            <StyledList>{blok.cards.map((card) => <li key={card.heading}>{card.left_heading}</li>)}</StyledList>
          </StyledIndex>

          {/* Cards */}
          <StyledCardsWrapper>
            {blok.cards.map((card) => (
              <SummaryCard key={card.left_heading} card={card} />
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
  top: 20px;
  left: 0;

  li {
    color: white;
    cursor: pointer;
  }
`;

const StyledCardsWrapper = styled.div`width: 80%;`;
