// Component for displaying the Section Header.
import React, { Component } from 'react';
import styled from 'styled-components';
import RichText from '../common/typography/Richtext';
import SbEditable from 'storyblok-react';
import SectionHeader from '../common/typography/SectionHeader';
import ButtonGroup from '../common/typography/ButtonGroup';

const SectionTextContent = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <StyledSection className={blok.background}>
        <div className="l-page short">
          <SectionHeader textContent={blok.header[0].text_content} />

          <RichText content={blok.body.content} />

          {blok.buttonGroup && blok.buttonGroup[0] && (
            <ButtonGroup buttons={blok.buttonGroup[0].buttons} />
          )}
        </div>
      </StyledSection>
    </SbEditable>
  );
};

const StyledSection = styled.section`
  &.dark {
    * {
      color: white;
    }
  }
`;

export default SectionTextContent;
