// Component for displaying the Section Header.
import React, { Component } from 'react';
import styled from 'styled-components';
import SbEditable from 'storyblok-react';
import PrimitiveTextContent from './typography/PrimitiveTextContent';

const SummaryCard = ({ card }) => {
  console.log('Card Body is', card.body);
  const ElementTag = `PrimitiveTextContent`
  return (
    <StyledCard>
        <StyledHeadingPrimary>{card.heading}</StyledHeadingPrimary>
      
      <StyledRight>
        {card.body && card.body.map(component => (
          <PrimitiveTextContent key={component._uid} body={component.body} />
        ))}
      </StyledRight>
    </StyledCard>
  )};

export default SummaryCard;


const StyledCard = styled.div`
  background: #fff;
  border-radius: 5px;
  margin: 10px 0 30px;
  padding: 10px 20px 50px;
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
    border: 8px solid transparent;
    
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
      border: 8px solid ${props => props.theme.secondary};
      height:100%;
      width: 100%;
      border-right: 0;
      border-bottom: 0;
    }

    &:after {
      border: 8px solid ${props => props.theme.secondary};
      height: 100%;
      width: 100%;
      border-left: 0;
      border-top: 0;
    }
  }
`;

const StyledHeadingPrimary = styled.h3`
  font-size: 2.25rem;
  font-weight: 500;
  letter-spacing: 0.4px;
  text-decoration: underline;
  text-decoration-color: ${props => props.theme.secondary};
  margin-bottom: 45px;
`;

const StyledRight = styled.div`

`;

