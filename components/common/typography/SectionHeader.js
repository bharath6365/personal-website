// Component for displaying the Section Header.
import React, { Component } from 'react'
import styled from 'styled-components';
import RichText from './Richtext';
import SbEditable from 'storyblok-react';

const SectionHeader = ({textContent}) => {
  return (
      <StyledSectionHeader>
        <RichText content={textContent.content} />
      </StyledSectionHeader>
  )
}


const StyledSectionHeader = styled.div`
  padding-bottom: 40px;
`;

export default SectionHeader;