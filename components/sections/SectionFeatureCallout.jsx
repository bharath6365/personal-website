import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import SbEditable from 'storyblok-react';
import SectionHeader from '../common/typography/SectionHeader';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'react-lottie-player';

const SectionFeatureCallout = ({ blok }) => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [lottieData, setLottieData] = useState({});

  // Load Lottie animation data for each feature
  useEffect(() => {
    if (blok.features) {
      const loadLottieData = async () => {
        const data = {};
        for (const feature of blok.features) {
          if (feature.icon) {
            try {
              const iconPath = `/files/${feature.icon}.json`;
              const response = await fetch(iconPath);
              const jsonData = await response.json();
              data[feature.icon] = jsonData;
            } catch (error) {
              console.error(`Failed to load Lottie animation for ${feature.icon}:`, error);
            }
          }
        }
        setLottieData(data);
      };
      
      loadLottieData();
    }
  }, [blok.features]);

  return (
    <SbEditable content={blok}>
      <StyledSection className={blok.background}>
        <div className='l-page'>
          <HeaderWrapper>
            {blok.section_content && (
              <SectionHeader textContent={blok.section_content} />
            )}
          </HeaderWrapper>

          <FeaturesContainer>
            {blok.features &&
              blok.features.map((feature, index) => (
                <FeatureRow
                  key={feature._uid || index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.3,
                    duration: 0.6,
                    ease: "easeOut",
                  }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  isHovered={hoveredFeature === index}
                  isBlurred={hoveredFeature !== null && hoveredFeature !== index}
                >
                  {hoveredFeature === index && (
                    <HighlightBackground 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                  
                  <FeatureContent isHovered={hoveredFeature === index}>
                    <FeatureHeading isHovered={hoveredFeature === index}>
                      {feature.heading}
                    </FeatureHeading>
                    <FeatureDescription isHovered={hoveredFeature === index}>
                      {feature.description}
                    </FeatureDescription>
                  </FeatureContent>
                  
                  <IconContainer isHovered={hoveredFeature === index}>
                    {feature.icon && lottieData[feature.icon] ? (
                      <LottieWrapper isHovered={hoveredFeature === index}>
                        <Lottie
                          loop={hoveredFeature === index}
                          play={true}
                          animationData={lottieData[feature.icon]}
                          style={{ width: 100, height: 100 }}
                        />
                      </LottieWrapper>
                    ) : (
                      <LottieLoading>Loading...</LottieLoading>
                    )}
                    <AnimatePresence>
                      {hoveredFeature === index && (
                        <IconGlow 
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 0.8, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                          transition={{ duration: 0.3 }}
                        />
                      )}
                    </AnimatePresence>
                  </IconContainer>
                </FeatureRow>
              ))}
          </FeaturesContainer>
        </div>
      </StyledSection>
    </SbEditable>
  );
};

const LottieWrapper = styled(motion.div)`
  position: relative;
  z-index: 2;
  transform: ${props => props.isHovered ? 'scale(1.15)' : 'scale(1)'};
  transition: transform 0.3s ease;
`;

const LottieLoading = styled.div`
  width: 100px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #888;
`;

const HeaderWrapper = styled.div`
  text-align: center;
  margin: 0 auto;
  max-width: 800px;
  
  h2, h3, p {
    text-align: center;
  }
`;

const StyledSection = styled.section`
  padding: 4rem 0;
  &.dark {
    background-color: #1a1a1a;
    color: white;
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 4rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
`;

const HighlightBackground = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: radial-gradient(circle at 50% 50%, rgba(255, 215, 0, 0.1) 0%, rgba(255, 215, 0, 0.02) 70%, transparent 100%);
  z-index: 0;
  pointer-events: none;
  border-radius: 12px;
`;

const FeatureRow = styled(motion.div)`
  display: flex;
  align-items: center;
  padding: 2rem;
  border-radius: 12px;
  transition: all 0.4s ease;
  position: relative;
  overflow: hidden;
  filter: ${props => props.isBlurred ? 'blur(2px) opacity(0.6)' : 'blur(0) opacity(1)'};
  transform: ${props => props.isHovered ? 'scale(1.03)' : props.isBlurred ? 'scale(0.98)' : 'scale(1)'};
  z-index: ${props => props.isHovered ? 2 : 1};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.5), transparent);
    transform: ${props => props.isHovered ? 'scaleX(1)' : 'scaleX(0)'};
    transition: transform 0.5s ease;
    opacity: ${props => props.isHovered ? 1 : 0};
  }

  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.5), transparent);
    transform: ${props => props.isHovered ? 'scaleX(1)' : 'scaleX(0)'};
    transition: transform 0.5s ease;
    opacity: ${props => props.isHovered ? 1 : 0};
  }
  
  &:nth-child(even) {
    flex-direction: row-reverse;
  }
`;

const IconContainer = styled.div`
  position: relative;
  margin: ${props => props.isHovered ? '0 3rem' : '0 2rem'};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s ease;
  z-index: 2;
`;

const IconGlow = styled(motion.div)`
  position: absolute;
  width: 150px;
  height: 150px;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 215, 0, 0.6) 0%, rgba(255, 215, 0, 0) 70%);
  z-index: 1;
  box-shadow: 0 0 30px 10px rgba(255, 215, 0, 0.3);
`;

const FeatureContent = styled.div`
  flex: 1;
  transition: transform 0.5s ease;
  transform: ${props => props.isHovered ? 'scale(1.03)' : 'scale(1)'};
  padding-left: ${props => props.isHovered ? '1rem' : '0'};
  z-index: 2;
`;

const FeatureHeading = styled.h3`
  font-size: 1.8rem;
  margin: 0 0 1rem 0;
  color: ${props => props.isHovered ? '#FFB400' : '#333'};
  transition: color 0.3s ease, transform 0.3s ease;
  transform-origin: left;
  transform: ${props => props.isHovered ? 'scale(1.05)' : 'scale(1)'};
  text-shadow: ${props => props.isHovered ? '0 0 8px rgba(255, 215, 0, 0.3)' : 'none'};
`;

const FeatureDescription = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin: 0;
  color: ${props => props.isHovered ? '#111' : '#666'};
  transition: color 0.3s ease;
  max-width: 90%;
`;

export default SectionFeatureCallout; 