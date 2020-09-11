// Component for displaying the Section Header.
import React, { Component } from 'react';
import styled from 'styled-components';
import Link from 'next/link';
import RichText from '../common/typography/Richtext';
import SbEditable from 'storyblok-react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import SectionHeader from '../common/typography/SectionHeader';
import Tags from '../common/Tags';
import GlobalConstants from '../../styles/Global-Constants';

const SectionProjectCard = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <StyledProjectSection className="dark">
        <Link href="/projects">
          <StyledBreadCrumb>
            <FaArrowLeft />
            Projects
          </StyledBreadCrumb>
        </Link>
        <StyledContentWrapper>
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

            <a href={blok.project_link} target="_blank">
              <StyledCTA>
                Take me there
                <FaArrowRight />
              </StyledCTA>
            </a>

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
  border-radius: 10px;

  @media ${GlobalConstants.tabletMediaQuery} {
    max-width: 80vw;
  }
`;

const StyledBreadCrumb = styled.div`
  display: inline-flex;
  align-items: center;
  color: white;
  margin: 30px 0 50px 30px;
  clip-path: polygon(0 0, 100% 1%, 93% 100%, 0% 100%);
  transition: all 0.4s ease;
  background: ${(props) => props.theme.secondary};
  padding: 5px 15px;
  cursor: pointer;

  svg {
    margin-right: 10px;
  }

  path {
    color: white;
  }

  &:hover {
    transform: rotateZ(6deg);
  }
`;

const StyledCTA = styled.div`
  display: inline-flex;
  align-items: center;
  margin: 20px 0;
  clip-path: polygon(0 0, 100% 1%, 93% 100%, 0% 100%);
  transition: all 0.4s ease-out;
  background: ${(props) => props.theme.primary};
  padding: 5px 15px;
  cursor: pointer;
  transform: rotateZ(-4deg);

  svg {
    margin-left: 5px;
  }

  &:hover {
    transform: rotateZ(0);
  }
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

  @media ${GlobalConstants.mobileMediaQuery} {
    margin-left: 10px;
  }
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

  @media ${GlobalConstants.mobileMediaQuery} {
    box-sizing: content-box;
    margin: 0 5px;
    padding: 6px;
    width: 20px;
    height: 20px;
  }
`;
