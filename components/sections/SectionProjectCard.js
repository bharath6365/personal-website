// Component for displaying the Section Header.
import React, { Component } from 'react';
import styled from 'styled-components';
import RichText from '../common/typography/Richtext';
import SbEditable from 'storyblok-react';
import SectionHeader from '../common/typography/SectionHeader';
import Tags from '../common/Tags';

const SectionProjectCard = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <StyledProjectSection className="dark">
        <StyledContentWrapper>
          {/* <StyledThumbnail
            src={blok.thumbnail_image.filename}
            title={blok.thumbnail_image.title}
            alt={blok.thumbnail_image.alt}
          /> */}

          <StyledTextWrapper>
            <StyledHeader>
              <StyledSkewedTitle>{blok.title}</StyledSkewedTitle>
              <StyledIcons>
                {/* Github */}
                <a href={blok.github_link} target="_blank">
                  <StyledIconWrapper>
                    <img src="/images/github.svg" alt="Github Link" />
                  </StyledIconWrapper>
                </a>

                {/* Code */}
                <a href={blok.project_link} target="_blank">
                  <StyledIconWrapper>
                    <img src="/images/link.svg" alt="Code Link" />
                  </StyledIconWrapper>
                </a>
              </StyledIcons>
            </StyledHeader>

            <RichText content={blok.text_content.content} />

            <Tags content={blok.tags[0]} />
          </StyledTextWrapper>
        </StyledContentWrapper>
      </StyledProjectSection>
    </SbEditable>
  );
};

export default SectionProjectCard;

const StyledProjectSection = styled.section``;

const StyledContentWrapper = styled.div`
  max-width: 65vw;
  margin: auto;
  background: #fff;
`;

const StyledThumbnail = styled.img`
  height: 450px;
  object-fit: cover;
  width: 100%;
  opacity: 0.75;
`;

const StyledTextWrapper = styled.div`padding: 40px 30px;`;

const StyledSkewedTitle = styled.h2`
  transform: skew(-20deg);
  background: ${(props) => props.theme.secondary};
  display: inline-block;
  padding: 20px;
`;
const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StyledIcons = styled.div`
  display: flex;
`;

const StyledIconWrapper = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  padding: 12px;
  margin-right: 15px;
  transition: all 0.5s ease-in-out;
  border: 1px solid transparent;

  &:hover {
    background: ${(props) => props.theme.secondary};
    border: 1px solid black;
  }
  img {
    width: 100%;
    height: 100%;
  }
`;
