// Component for displaying the Section Header.
import React, { Component } from 'react';
import styled from 'styled-components';
import PrimitiveTextContent from './typography/PrimitiveTextContent';
import Tags from './Tags';
import Richtext from './typography/Richtext';
import ResourceCards from './ResourceCards';

const SummaryCard = ({ settings, card, id }) => {
  console.log('Card is', card);
  return (
    <StyledCard id={'#' + id}>
      <StyledHeader>
        <StyledHeadingPrimary>{card.heading}</StyledHeadingPrimary>
        {card.description && <Richtext content={card.description.content} />}
      </StyledHeader>

      <StyledRight>
        {card.body &&
          card.body.map((component) => {
            if (component.component === 'primitive-text-content') {
              return (
                <StyledRichTextWrapper className={card.border_separation ? 'bordered' : ''}>
                  <PrimitiveTextContent key={component._uid} body={component.body} />
                </StyledRichTextWrapper>
              );
            } else if (component.component === 'Tags') {
              return <Tags content={component} />;
            } else if (component.component === 'section-resource-cards') {
              return <ResourceCards enableVerticalBoxShadow={false} cards={settings.content.project_cards} />;
            }
          })}
          
      </StyledRight>
    </StyledCard>
  );
};

export default SummaryCard;

const StyledCard = styled.div`
  background: #fff;
  border-radius: 5px;
  margin: 10px 0 30px;
  padding: 25px 20px;
  position: relative;
  box-sizing: border-box;
  overflow: hidden;
  transition: transform 0.3s ease;

  &:before,
  &:after {
    position: absolute;
    content: '';
    border-radius: 5px;
    width: 0%;
    height: 0%;
    transition: all 0.4s linear;
    border: 3px solid transparent;
    z-index: -1;
  }

  &:before {
    top: 0;
    left: 0;
    border-right: 0;
    border-bottom: 0;
  }

  &:after {
    bottom: 0;
    right: 0;
    border-left: 0;
    border-top: 0;
  }

  &:hover {
    transform: translateY(-2px);
    &:before {
      border: 3px solid ${(props) => props.theme.secondary};
      height: 100%;
      width: 100%;
      border-right: 0;
      border-bottom: 0;
    }

    &:after {
      border: 3px solid ${(props) => props.theme.secondary};
      height: 100%;
      width: 100%;
      border-left: 0;
      border-top: 0;
    }
  }
`;

const StyledHeader = styled.div`margin-bottom: 45px;`;

const StyledHeadingPrimary = styled.h3`
  font-size: 2.25rem;
  font-weight: 500;
  letter-spacing: 0.4px;
  text-decoration: underline;
  text-decoration-color: ${(props) => props.theme.secondary};
`;

const StyledRichTextWrapper = styled.div`
  &.bordered {
    &:not(:last-of-type) {
      margin-bottom: 20px;
      border-bottom: 1px solid ${(props) => props.theme.primary};
    }
  }
`;

const StyledRight = styled.div``;
