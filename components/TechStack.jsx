import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Add a new section wrapper with a different background
const SectionWrapper = styled.div`
  padding: 4rem 0;
  background: #ffffff;
`;

// Styled components for the container
const TechStackContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 30px auto 50px;
  overflow: hidden;
  border-radius: 10px;
  background: #000000;
  padding: 40px 20px 50px;
  max-width: 1400px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
`;

const TechStackTitle = styled.h2`
  font-size: 2.5rem;
  font-family: 'Josefin Sans', sans-serif;
  color: #ffc600;
  text-align: center;
  margin-bottom: 40px;
  font-weight: 600;
  position: relative;
  z-index: 5;
  text-shadow: 0 0 10px rgba(255, 198, 0, 0.3);
`;

const CategoryContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px auto;
  position: relative;
  z-index: 10;
  gap: 15px;
  overflow: visible;
  width: 100%;
  max-width: 600px;
`;

const CategoryButton = styled.button`
  background: transparent;
  color: ${props => props.active ? '#ffc600' : '#fff'};
  border: none;
  padding: 10px 25px;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  position: relative;
  z-index: 10;
  text-transform: uppercase;
  letter-spacing: 1px;
  transition: all 0.3s ease;
  
  &::after {
    content: '';
    position: absolute;
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    width: ${props => props.active ? '6px' : '0'};
    height: ${props => props.active ? '6px' : '0'};
    background: #ffc600;
    border-radius: 50%;
    margin-top: 8px;
    box-shadow: 0 0 10px #ffc600, 0 0 20px rgba(255, 198, 0, 0.4);
    transition: all 0.3s ease;
  }
  
  &:hover {
    color: #ffc600;
    
    &::after {
      width: ${props => props.active ? '6px' : '4px'};
      height: ${props => props.active ? '6px' : '4px'};
    }
  }
`;

const TabHighlight = styled(motion.div)`
  position: absolute;
  top: 0;
  height: 45px;
  border-radius: 6px;
  background: rgba(255, 198, 0, 0.1);
  box-shadow: 0 0 15px rgba(255, 198, 0, 0.3);
  z-index: 1;
  pointer-events: none;
  left: 0;
  right: 0;
  margin: 0 auto;
  width: auto;
`;

const TechGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 20px;
  padding: 20px;
  min-height: 300px;
  position: relative;
  z-index: 2;
  margin: 0 auto;
  max-width: 1200px;
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
  
  @media (max-width: 900px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 600px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TechItem = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 15px;
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.3);
  position: relative;
  overflow: hidden;
  height: 160px;
`;

const TechLogo = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 10px;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));
`;

const TechName = styled.h3`
  font-size: 1rem;
  color: white;
  text-align: center;
  margin: 0;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
`;

const Spotlight = styled(motion.div)`
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle,
    rgba(255, 255, 255, 0.4) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.05) 40%,
    rgba(255, 255, 255, 0) 60%
  );
  border-radius: 50%;
  filter: blur(30px);
  z-index: 1;
  pointer-events: none;
  opacity: 0.8;
  mix-blend-mode: screen;
`;

const Torch = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 30px;
  height: 30px;
  background: #ffc600;
  border-radius: 50%;
  filter: blur(5px);
  box-shadow: 
    0 0 30px 20px rgba(255, 255, 255, 0.6),
    0 0 80px 40px #ffc600;
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: screen;
  transform-origin: center bottom;
`;

const LightBeam = styled(motion.div)`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 60%;
  background: linear-gradient(to top, 
    rgba(255, 198, 0, 0.3) 0%,
    rgba(255, 255, 255, 0.1) 50%,
    rgba(255, 255, 255, 0) 100%
  );
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: screen;
  transform-origin: center bottom;
  opacity: 0;
`;

const SpotlightOverlay = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.92);
  z-index: 1;
  pointer-events: none;
`;

// Tech stack data with image URLs
const techStackData = {
  frontend: [
    { name: 'React', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/React-icon.svg/1200px-React-icon.svg.png' },
    { name: 'NextJS', imageUrl: 'https://cdn.worldvectorlogo.com/logos/nextjs-2.svg' },
    { name: 'TypeScript', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png' },
    { name: 'GSAP', imageUrl: 'https://cdn.worldvectorlogo.com/logos/gsap-greensock.svg' },
    { name: 'HTML5', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/61/HTML5_logo_and_wordmark.svg' },
    { name: 'CSS3', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/d5/CSS3_logo_and_wordmark.svg' },
    { name: 'GraphQL', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/17/GraphQL_Logo.svg' },
    { name: 'Redux', imageUrl: 'https://cdn.worldvectorlogo.com/logos/redux.svg' },
    { name: 'Vue.js', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/95/Vue.js_Logo_2.svg' },
  ],
  backend: [
    { name: 'NodeJS', imageUrl: 'https://nodejs.org/static/images/logos/nodejs-new-pantone-black.svg' },
    { name: 'Golang', imageUrl: 'https://go.dev/blog/go-brand/Go-Logo/PNG/Go-Logo_Blue.png' },
    { name: 'PostgreSQL', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png' },
    { name: 'MongoDB', imageUrl: 'https://www.mongodb.com/assets/images/global/leaf.svg' },
    { name: 'Microservices', imageUrl: 'https://cdn-icons-png.flaticon.com/512/8636/8636551.png' },
    { name: 'WebSockets', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/1/10/WebSocket_logo.png' },
    { name: 'Redis', imageUrl: 'https://cdn.worldvectorlogo.com/logos/redis.svg' },
    { name: 'Docker', imageUrl: 'https://www.docker.com/sites/default/files/d8/2019-07/vertical-logo-monochromatic.png' },
    { name: 'Java', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg' },
    { name: 'Express', imageUrl: 'https://expressjs.com/images/express-facebook-share.png' },
  ],
  services: [
    { name: 'Stripe', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png' },
    { name: 'Strapi', imageUrl: 'https://strapi.io/assets/strapi-logo-dark.svg' },
    { name: 'Shopify', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png' },
    { name: 'AWS', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Firebase', imageUrl: 'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png' },
    { name: 'Vercel', imageUrl: 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png' },
    { name: 'Netlify', imageUrl: 'https://www.netlify.com/img/press/logos/logomark.png' },
    { name: 'Cloudflare', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.png' },
  ],
};

// Main component
const TechStack = () => {
  const [activeCategory, setActiveCategory] = useState('frontend');
  const [hasError, setHasError] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef(null);
  const buttonRefs = useRef({
    frontend: useRef(null),
    backend: useRef(null),
    services: useRef(null)
  });
  const [tabBounds, setTabBounds] = useState({
    left: 0,
    width: 0
  });
  
  // Update the tab highlight position when category changes
  useEffect(() => {
    const currentButton = buttonRefs.current[activeCategory].current;
    if (currentButton) {
      const { offsetLeft, offsetWidth } = currentButton;
      setTabBounds({
        left: offsetLeft,
        width: offsetWidth
      });
    }
  }, [activeCategory]);
  
  useEffect(() => {
    // Catch any errors that might occur during rendering
    const handleError = (error) => {
      console.error('TechStack error:', error);
      setHasError(true);
    };

    window.addEventListener('error', handleError);
    return () => window.removeEventListener('error', handleError);
  }, []);

  // Handle mouse move for spotlight effect
  const handleMouseMove = (e) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
  };
  
  // Handle category change
  const handleCategoryChange = (category) => {
    if (category !== activeCategory) {
      setIsAnimating(true);
      
      // After animation completes, change the category
      setTimeout(() => {
        setActiveCategory(category);
        
        // After changing category, animate spotlight effect
        setTimeout(() => {
          setIsAnimating(false);
        }, 300);
      }, 500);
    }
  };
  
  if (hasError) {
    return (
      <div style={{ padding: '20px', textAlign: 'center' }}>
        <h3>Something went wrong with the tech stack visualization.</h3>
        <p>Please try refreshing the page.</p>
      </div>
    );
  }
  
  return (
    <SectionWrapper>
      <TechStackTitle>My Tech Stack</TechStackTitle>
      <CategoryContainer>
        <TabHighlight 
          animate={{ 
            x: tabBounds.left,
            width: tabBounds.width
          }}
          initial={false}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30
          }}
        />
        <CategoryButton 
          ref={buttonRefs.current.frontend}
          active={activeCategory === 'frontend'} 
          onClick={() => handleCategoryChange('frontend')}
        >
          Frontend
        </CategoryButton>
        <CategoryButton 
          ref={buttonRefs.current.backend}
          active={activeCategory === 'backend'} 
          onClick={() => handleCategoryChange('backend')}
        >
          Backend
        </CategoryButton>
        <CategoryButton 
          ref={buttonRefs.current.services}
          active={activeCategory === 'services'} 
          onClick={() => handleCategoryChange('services')}
        >
          Services
        </CategoryButton>
      </CategoryContainer>
      <TechStackContainer 
        ref={containerRef}
        onMouseMove={handleMouseMove}
      >
        {/* Spotlight overlay with animated opacity */}
        <SpotlightOverlay 
          initial={{ opacity: 0 }}
          animate={{ opacity: isAnimating ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />
        
        <LightBeam
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ 
            opacity: isAnimating ? 0.8 : 0,
            scaleY: isAnimating ? 1 : 0
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut"
          }}
        />
        
        <Torch
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: isAnimating ? 1 : 0,
            scale: isAnimating ? 1 : 0,
            y: isAnimating ? -30 : 0
          }}
          transition={{ 
            duration: 0.5,
            ease: "easeInOut"
          }}
        />
        
        {/* Moving spotlight that follows cursor */}
        <Spotlight 
          animate={{ 
            x: mousePosition.x - 150,
            y: mousePosition.y - 150,
            opacity: isAnimating ? 0 : 0.8,
            scale: isAnimating ? 0 : 1,
          }}
          transition={{ 
            x: { duration: 0.1, ease: "linear" },
            y: { duration: 0.1, ease: "linear" },
            opacity: { duration: 0.3 },
            scale: { duration: 0.3 }
          }}
        />
        
        <TechGrid>
          {techStackData[activeCategory].map((tech, index) => (
            <TechItem
              key={tech.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ 
                opacity: 1, 
                y: 0,
                transition: {
                  delay: 0.08 * index + (isAnimating ? 0.8 : 0),
                  duration: 0.4
                }
              }}
              exit={{ opacity: 0, y: -20 }}
              whileHover={{ 
                y: -5, 
                scale: 1.05,
                boxShadow: "0px 15px 30px 0px rgba(255,255,255,0.15)",
                transition: {
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }
              }}
            >
              <TechLogo src={tech.imageUrl} alt={tech.name} />
              <TechName>{tech.name}</TechName>
            </TechItem>
          ))}
        </TechGrid>
      </TechStackContainer>
    </SectionWrapper>
  );
};

export default TechStack; 