

import styled from 'styled-components';
import {useRef} from 'react'
import Typed from 'react-typed';
import GlobalTheme from '../styles/Global-Theme'


import SbEditable from 'storyblok-react';
import RichText from './common/typography/Richtext';
import GlobalConstants from '../styles/Global-Constants';
import { useEffect } from 'react';

const StyledBanner = styled.div`
  position: relative;
  /* clip-path: polygon(0 0, 100% 0, 100% 89%, 0 100%); */
  background: black;
  padding: 50px 80px;
  

  &.none {
    clip-path: none;
  }
  

  @media ${GlobalConstants.mobileMediaQuery} {
    padding: 80px 20px;
  }
`;

const StyledBannerInner = styled.div`
  max-width: 1140px;
  margin: auto;
  display: flex;
  align-items: center;

  @media ${GlobalConstants.mobileMediaQuery} {
    flex-wrap: wrap;
    padding: 30px 20px;
  }
`

const StyledBannerContent = styled.div`
  padding: 100px 40px 100px 0;
  min-width: ${props => `${props.width}%` || '50%'};
  transform: translateY(-100%);
  filter: blur(5px);
  transition: transform 0.75s ease-in-out, filter 2s ease-in-out;

  @media ${GlobalConstants.mobileMediaQuery} {
    min-width: 100% !important;
    padding: 0 0 30px;

    p {
      text-align: center;
    }
  }
`;

const StyledTypingContainer = styled.div`
  color: white;

  span {
    font-size: 2rem;
    tex-decoration: underline;
    border-bottom: 1px solid  ${GlobalTheme.secondary};
  }

  @media ${GlobalConstants.mobileMediaQuery} {
    span {
      font-size: 0.95rem;
    }
    
  }

`

const StyledBannerImageContainer = styled.div`
  img {
    max-height: 450px;
  }

  @media ${GlobalConstants.mobileMediaQuery} {
    padding: 0;
    margin: auto;

    img {
      max-width: 175px !important;
    }
  }
`;

const Banner = ({ blok }) => {
  const image = blok.image || {
    filename: '',
    alt: ''
  }
  const bannerRef = useRef(null);

  useEffect(() => {
    setTimeout(() => {
      bannerRef.current.style.transform = 'translateY(0)';
      bannerRef.current.style.filter = 'blur(0)'
    }, 10)

  }, [])
  return (
    <SbEditable content={blok}>
      <StyledBanner className={blok.clip_path}>
        <StyledBannerInner>
          <StyledBannerContent ref={bannerRef} width={blok.text_width}>
            <RichText textColor={'white'} content={blok.text_content.content} />
            {
              blok.typing_text && blok.typing_text.length > 0 && 
               <StyledTypingContainer>
                <Typed
                  strings={blok.typing_text}
                  typeSpeed={50}
                  backDelay={1500}
                  backSpeed={40}
                  startDelay={2000}
                  loop
                />
              </StyledTypingContainer> 
            }
            
            
          </StyledBannerContent>
          <StyledBannerImageContainer>
            <img style={{borderRadius: '50%'}} src={"/images/bharath.jpeg"} alt={image.alt} />
          </StyledBannerImageContainer>
        </StyledBannerInner>
        
      </StyledBanner>
    </SbEditable>
  );
};

export default Banner;
