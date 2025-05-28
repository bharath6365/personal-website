import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import SbEditable from 'storyblok-react';
import SectionHeader from '../common/typography/SectionHeader';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'react-lottie-player';

// Custom cubic-bezier curves for premium animations
const premiumEasing = [0.25, 0.1, 0.25, 1.0]; // Custom easing for smoother, more sophisticated motion
const entranceEasing = [0.22, 0.68, 0.36, 1.0]; // Ease-out-back-like curve for entrance animations
const iconEntranceEasing = [0.34, 1.56, 0.64, 1]; // Custom curve with overshoot for icon entrance

const SectionFeatureCallout = ({ blok }) => {
  const [hoveredFeature, setHoveredFeature] = useState(null);
  const [lottieData, setLottieData] = useState({});
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [visibleIcons, setVisibleIcons] = useState([]);
  const containerRef = useRef(null);
  const rowRefs = useRef([]);

  // Initialize all icons as visible (fallback)
  useEffect(() => {
    if (blok?.features?.length > 0) {
      // Default - make all icons visible
      const allIndices = blok.features.map((_, i) => i);
      setVisibleIcons(allIndices);
    }
  }, [blok?.features]);

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

  // Handle mouse move for subtle effects
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const { left, top, width, height } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width;
      const y = (e.clientY - top) / height;
      setMousePosition({ x, y });
    }
  };

  return (
    <SbEditable content={blok}>
      <StyledSection 
        className={blok.background}
        ref={containerRef}
        onMouseMove={handleMouseMove}
      >
        <div className="l-page">
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
                  ref={el => rowRefs.current[index] = el}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: index * 0.2,
                    duration: 0.7,
                    ease: entranceEasing,
                  }}
                  onMouseEnter={() => setHoveredFeature(index)}
                  onMouseLeave={() => setHoveredFeature(null)}
                  isHovered={hoveredFeature === index}
                  isBlurred={hoveredFeature !== null && hoveredFeature !== index}
                >
                  <FeatureCard
                    isHovered={hoveredFeature === index}
                    style={{
                      transform: hoveredFeature === index 
                        ? `translateY(-8px) scale(1.01)` 
                        : `translateY(0) scale(1)`
                    }}
                  >
                    <FeatureContent 
                      isHovered={hoveredFeature === index}
                    >
                      <FeatureHeading 
                        isHovered={hoveredFeature === index}
                      >
                        {feature.heading}
                      </FeatureHeading>
                      <FeatureDescription 
                        isHovered={hoveredFeature === index}
                      >
                        {feature.description}
                      </FeatureDescription>
                    </FeatureContent>
                    
                    <IconContainer 
                      isHovered={hoveredFeature === index}
                      isEven={index % 2 !== 0}
                    >
                      {feature.icon && lottieData[feature.icon] ? (
                        <LottieWrapper 
                          isHovered={hoveredFeature === index}
                          isEven={index % 2 !== 0}
                          initial={{
                            opacity: 0, 
                            x: typeof window !== 'undefined' && window.innerWidth <= 767 ? 0 : (index % 2 !== 0 ? 80 : -80),
                            scale: 0.5,
                            rotate: typeof window !== 'undefined' && window.innerWidth <= 767 ? 0 : (index % 2 !== 0 ? 15 : -15)
                          }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            scale: hoveredFeature === index ? 1.08 : 1,
                            rotate: 0
                          }}
                          transition={{
                            duration: 0.8,
                            ease: iconEntranceEasing,
                            delay: 0.1,
                            scale: {
                              duration: 0.5,
                              ease: premiumEasing
                            }
                          }}
                        >
                          <Lottie
                            loop={hoveredFeature === index}
                            play={true}
                            animationData={lottieData[feature.icon]}
                            className="lottie-player"
                          />
                          <AnimatePresence>
                            {hoveredFeature === index && (
                              <IconHighlight 
                                initial={{ opacity: 0, scale: 0.7 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.7 }}
                                transition={{ duration: 0.4, ease: premiumEasing }}
                              />
                            )}
                          </AnimatePresence>
                        </LottieWrapper>
                      ) : (
                        <LottieLoading>Loading...</LottieLoading>
                      )}
                    </IconContainer>
                  </FeatureCard>
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

  @media (max-width: 767px) {
    // Reset complex entrance animations for simpler mobile view if they feel off
    // For example, override initial x, rotate for mobile:
    // initial: { opacity: 0, scale: 0.5, x: 0, rotate: 0 } 
    // You might need to adjust the 'animate' prop values here too if overriding initial.
  }
`;

const IconHighlight = styled(motion.div)`
  position: absolute;
  top: -15px;
  left: -15px;
  right: -15px;
  bottom: -15px;
  border: 1px solid rgba(244, 190, 55, 0.3);
  border-radius: 50%;

  @media (max-width: 767px) {
    // Potentially adjust size or disable if it doesn't look good with smaller icons
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
  }
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
  position: relative;
  &.dark {
    background-color: #1a1a1a;
    color: white;
  }

  @media (max-width: 767px) {
    padding: 2.5rem 0;
  }
`;

const FeaturesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-top: 2.5rem;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  position: relative;

  @media (max-width: 767px) {
    gap: 2rem; // Reduce gap between features on mobile
    margin-top: 1.5rem;
    padding: 0 1rem; // Add some horizontal padding for the container itself
  }
`;

const FeatureCard = styled(motion.div)`
  position: relative;
  display: flex;
  align-items: center;
  padding: 2rem;
  border-radius: 8px;
  background: white;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.04);
  transition: all 0.4s cubic-bezier(0.21, 0.6, 0.35, 1);
  border: 1px solid ${props => props.isHovered ? 'rgba(244, 190, 55, 0.15)' : 'rgba(0, 0, 0, 0.06)'};
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(90deg, rgba(244, 190, 55, 0.8), rgba(244, 190, 55, 0.2));
    transform: scaleX(${props => props.isHovered ? 1 : 0});
    transform-origin: left;
    transition: transform 0.6s cubic-bezier(0.21, 0.6, 0.35, 1);
  }

  @media (max-width: 767px) {
    flex-direction: column; // Stack items vertically
    padding: 1.5rem; // Reduce padding
    align-items: center; // Center items in column layout
    text-align: center; // Center text content
  }
`;

const FeatureRow = styled(motion.div)`
  position: relative;
  filter: ${props => props.isBlurred ? 'blur(2px) opacity(0.5)' : 'blur(0) opacity(1)'};
  transition: filter 0.5s cubic-bezier(0.21, 0.6, 0.35, 1);
  z-index: ${props => props.isHovered ? 2 : 1};
  
  &:nth-child(even) ${FeatureCard} {
    flex-direction: row-reverse; // This will be overridden on mobile by the column direction
    @media (max-width: 767px) {
      flex-direction: column; // Ensure even items also stack vertically on mobile
    }
  }
`;

const IconContainer = styled.div`
  position: relative;
  margin: 0 2.5rem; // Default margin for desktop
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.5s cubic-bezier(0.21, 0.6, 0.35, 1);
  transform: ${props => props.isHovered ? props.isEven ? 'translateX(-10px)' : 'translateX(10px)' : 'translateX(0)'};

  // Default Lottie player size for desktop
  .lottie-player {
    width: 100px !important; // Original desktop size
    height: 100px !important; // Original desktop size
  }

  @media (max-width: 767px) {
    order: 1; // Icon first on mobile
    margin: 0 0 1.5rem 0; // Margin below icon on mobile
    transform: none; // Reset transform for mobile
    
    // Lottie animation styling for mobile, overrides the default above
    .lottie-player {
        width: 80px !important;
        height: 80px !important;
    }
  }
`;

const FeatureContent = styled.div`
  flex: 1;
  transition: transform 0.5s cubic-bezier(0.21, 0.6, 0.35, 1);
  transform: ${props => props.isHovered ? 'translateX(5px)' : 'translateX(0)'};

  @media (max-width: 767px) {
    order: 2; // Content (heading, description) after icon on mobile
    transform: none; // Reset transform for mobile
    width: 100%; // Take full width for centered text
  }
`;

const FeatureHeading = styled.h3`
  font-size: 1.6rem;
  margin: 0 0 1rem 0;
  color: ${props => props.isHovered ? '#C99700' : '#333'};
  transition: color 0.3s ease, transform 0.5s cubic-bezier(0.21, 0.6, 0.35, 1);
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: -8px;
    width: ${props => props.isHovered ? '40px' : '0'};
    height: 2px;
    background: rgba(244, 190, 55, 0.7);
    transition: width 0.4s cubic-bezier(0.21, 0.6, 0.35, 1);
  }

  @media (max-width: 767px) {
    font-size: 1.3rem; // Reduced font size for mobile
    margin-bottom: 0.75rem;
    &::after {
        left: 50%; // Center the underline
        transform: translateX(-50%);
    }
  }
`;

const FeatureDescription = styled.p`
  font-size: 1.05rem;
  line-height: 1.7;
  margin: 0;
  color: ${props => props.isHovered ? '#555' : '#666'};
  transition: color 0.3s ease;
  max-width: 90%; // Default max-width for desktop text

  @media (max-width: 767px) {
    font-size: 0.95rem; // Reduced font size for mobile
    line-height: 1.6;
    max-width: 100%; // Allow full width for centered text
  }
`;

export default SectionFeatureCallout; 