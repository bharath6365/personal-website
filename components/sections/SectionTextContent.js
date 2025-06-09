// Component for displaying the Section Header.
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import RichText from '../common/typography/Richtext';
import SbEditable from 'storyblok-react';
import SectionHeader from '../common/typography/SectionHeader';
import ButtonGroup from '../common/typography/ButtonGroup';
import { motion, useAnimation } from 'framer-motion';

const SectionTextContent = ({ blok }) => {
  const controls = useAnimation();
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start('visible');
        } else {
          // Optional: Reset animation when out of view
          // controls.start('hidden'); 
        }
      },
      { threshold: 0.25 } // Trigger when 25% of the element is visible
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [controls]);

  const leftWindowVariants = {
    hidden: {
      x: 0, // Start at normal position
    },
    visible: {
      x: "-100%", // Slide completely to the left
      transition: {
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const rightWindowVariants = {
    hidden: {
      x: 0, // Start at normal position
    },
    visible: {
      x: "100%", // Slide completely to the right
      transition: {
        duration: 1.0,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  const contentVariants = {
    hidden: { 
      opacity: 0, 
      y: 30,       // Reduced y-offset for a gentler start
      scale: 0.9,  // Reduced initial scale for a subtler effect
      filter: "blur(8px)", // Slightly reduced blur
    }, 
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      filter: "blur(0px)",
      transition: {
        delay: 0.5,         // Adjusted delay to better sync with window opening
        duration: 1.0,        // Shorter duration for the container itself
        ease: [0.16, 1, 0.3, 1], // Keep this nice easing for the container
        staggerChildren: 0.2, // Increased stagger for more distinct child animations
      },
    },
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 25,          // Start slightly lower
      rotate: 4,      // Slight initial 2D rotation for a dynamic entrance
      scale: 0.95,      // Start slightly smaller
      filter: "blur(4px)",
    },
    visible: {
      opacity: 1,
      y: 0,
      rotate: 0,      // Rotate back to normal
      scale: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",    // Use a spring for a natural settle effect
        damping: 15,    // Adjust for bounciness (higher = less bounce)
        stiffness: 150, // Adjust for speed/energy (lower = softer/slower)
      },
    },
  };

  return (
    <SbEditable content={blok}>
      <StyledSection className={blok.background} ref={sectionRef}>
        <WindowContainer initial="hidden" animate={controls}>
          <LeftWindowPane variants={leftWindowVariants} />
          <RightWindowPane variants={rightWindowVariants} />
        </WindowContainer>
        
        <ContentWrapper initial="hidden" animate={controls} variants={contentVariants}>
          <div className="l-page short">
            <motion.div variants={childVariants}>
              <SectionHeader textContent={blok.header[0].text_content} />
            </motion.div>
            <motion.div variants={childVariants}>
              <RichText content={blok.body.content} />
            </motion.div>
            {blok.buttonGroup && blok.buttonGroup[0] && (
              <motion.div variants={childVariants}>
                <ButtonGroup buttons={blok.buttonGroup[0].buttons} />
              </motion.div>
            )}
          </div>
        </ContentWrapper>
      </StyledSection>
    </SbEditable>
  );
};

const StyledSection = styled(motion.section)`
  position: relative;
  overflow: hidden;
  padding: 4rem 0;
  perspective: 1000px; // Enable 3D transforms

  &.dark {
    // Window panes are styled separately for dark mode
  }
`;

const WindowContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  pointer-events: none;
`;

const BaseWindowPane = styled(motion.div)`
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50%;
  background: linear-gradient(135deg, 
    rgba(255, 255, 255, 0.9) 0%, 
    rgba(240, 248, 255, 0.8) 50%, 
    rgba(255, 255, 255, 0.9) 100%
  );
  border: 4px solid #8b7355;
  border-radius: 8px;
  box-shadow: 
    0 8px 32px rgba(0,0,0,0.15),
    inset 0 1px 0 rgba(255,255,255,0.8),
    inset 0 -1px 0 rgba(0,0,0,0.1);
  
  // Window frame inner border
  &::before {
    content: '';
    position: absolute;
    top: 8px;
    left: 8px;
    right: 8px;
    bottom: 8px;
    border: 2px solid #a0916b;
    border-radius: 4px;
    background: linear-gradient(45deg, 
      rgba(255, 255, 255, 0.1) 0%, 
      transparent 50%, 
      rgba(255, 255, 255, 0.1) 100%
    );
  }

  // Window panes (cross pattern)
  &::after {
    content: '';
    position: absolute;
    top: 12px;
    left: 12px;
    right: 12px;
    bottom: 12px;
    background: 
      linear-gradient(to right, #a0916b 49%, transparent 49%, transparent 51%, #a0916b 51%),
      linear-gradient(to bottom, #a0916b 49%, transparent 49%, transparent 51%, #a0916b 51%);
    background-size: 100% 3px, 3px 100%;
    background-position: center, center;
    background-repeat: no-repeat;
  }

  .dark & {
    background: linear-gradient(135deg, 
      rgba(30, 30, 30, 0.95) 0%, 
      rgba(20, 25, 35, 0.9) 50%, 
      rgba(30, 30, 30, 0.95) 100%
    );
    border-color: #4a4a4a;
    box-shadow: 
      0 8px 32px rgba(0,0,0,0.4),
      inset 0 1px 0 rgba(255,255,255,0.1),
      inset 0 -1px 0 rgba(0,0,0,0.3);
    
    &::before {
      border-color: #666;
      background: linear-gradient(45deg, 
        rgba(255, 255, 255, 0.05) 0%, 
        transparent 50%, 
        rgba(255, 255, 255, 0.05) 100%
      );
    }

    &::after {
      background: 
        linear-gradient(to right, #666 49%, transparent 49%, transparent 51%, #666 51%),
        linear-gradient(to bottom, #666 49%, transparent 49%, transparent 51%, #666 51%);
      background-size: 100% 3px, 3px 100%;
      background-position: center, center;
      background-repeat: no-repeat;
    }
  }
`;

const LeftWindowPane = styled(BaseWindowPane)`
  left: 0;
  border-right: 1px solid #cbd5e1;
`;

const RightWindowPane = styled(BaseWindowPane)`
  right: 0;
  border-left: 1px solid #cbd5e1;
`;

const ContentWrapper = styled(motion.div)`
  position: relative;
  z-index: 1;
`;

export default SectionTextContent;
