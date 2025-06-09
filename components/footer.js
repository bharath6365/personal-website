import Link from 'next/link';
import styled from 'styled-components';
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope
} from "react-icons/fa"
import GlobalConstants from '../styles/Global-Constants';

const Footer = ({ settings }) => {
  const footerContent= settings.content.main_footer[0];
  return (
    <StyledFooter>
      <StyledContentWrapper className="l-page">
        <h2>{footerContent.title}</h2>
        
        <StyledIconsWrapper>
          <a href={footerContent.github_link} target="_blank">
            <StyledIconWrapper>
              <FaGithub />
            </StyledIconWrapper>
          </a>

          <a href={footerContent.linkedin_link} target="_blank">
            <StyledIconWrapper>
              <FaLinkedin />
            </StyledIconWrapper>
          </a>

          <a href={footerContent.email_link} target="_blank">
            <StyledIconWrapper>
              <FaEnvelope />
            </StyledIconWrapper>
          </a>
        </StyledIconsWrapper>
        
        <StyledCopyRights>
          {footerContent.copyrights}
        </StyledCopyRights>
      </StyledContentWrapper>
    </StyledFooter>
  )
};

export default Footer;

const StyledFooter = styled.footer`
  position: relative;
  background: black;
  padding: 50px 0;
  text-align: center;
  min-height: 30vh;
  display: flex;
  align-items: center;
`;

const StyledContentWrapper = styled.div`
  position: relative;
  z-index: 10;
  color: white;
  width: 100%;
`;

const StyledCopyRights = styled.div`
  color: #ccc;
  font-size: 1.25rem;
  letter-spacing: 0.3px;
`

const StyledIconsWrapper = styled.div`
  display: flex;
  justify-content: space-evenly;
  max-width: 30vw;
  text-align: center;
  margin: 30px auto;

  @media ${GlobalConstants.mobileMediaQuery} {
    max-width: 95vw;
  }
`;

const StyledIconWrapper = styled.div`
  width: 50px;
  height: 50px;
  box-sizing: content-box;
  padding: 20px;
  position: relative;

  &:before {
    content: '';
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: ${(props) => props.theme.primary};
    transform: scaleX(0);
    transition: transform 0.3s ease;
    transform-origin: left top;
  }

  &:hover {
    &:before {
      transform: scaleX(1);
    }
  }

  svg {
    width: 100%;
    height: 100%;
    color: white;

    path{
      color: inherit;
    }
  }
`;

