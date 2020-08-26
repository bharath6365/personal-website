import { Fragment } from 'react';

import styled from 'styled-components';
import Particles from './common/Particles';

import SbEditable from 'storyblok-react';
import RichText from './common/typography/Richtext';

const StyledBanner = styled.div`
  position: relative;
  height: 60vh;
  clip-path: polygon(0 0, 100% 0, 100% 90%, 0% 100%);

  &.none {
    clip-path: none;
  }
`;

const StyledBannerContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  text-align: center;
`;

const Banner = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <StyledBanner className={blok.clip_path}>
        <Particles />
        <StyledBannerContent>
          <RichText textColor={'white'} content={blok.text_content.content} />
        </StyledBannerContent>
      </StyledBanner>
    </SbEditable>
  );
};

export default Banner;
