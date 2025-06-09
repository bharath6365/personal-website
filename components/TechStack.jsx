import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// Add a new section wrapper with a different background
const SectionWrapper = styled.div`
  padding: 4rem 0;
  background: #ffffff;

  @media (max-width: 767px) {
    padding: 2rem 0;
  }

  @media (max-width: 480px) {
    padding: 1.5rem 0;
  }
`;

// Styled components for the container
const TechStackContainer = styled.div`
  position: relative;
  width: 100%;
  margin: 20px auto 40px;
  overflow: hidden;
  border-radius: 10px;
  background: #000000;
  padding: 30px 20px 40px;
  max-width: 90%;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);

  @media (max-width: 767px) {
    padding: 20px 10px 30px;
    max-width: 95%;
  }

  @media (max-width: 480px) {
    padding: 15px 5px 25px;
    margin: 15px auto 30px;
  }
`;

const TechStackTitle = styled.h2`
  font-size: 2.5rem;
  font-family: 'Josefin Sans', sans-serif;
  color: #000000;
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
  position: relative;
  z-index: 5;
  text-shadow: none;
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

  @media (max-width: 767px) {
    gap: 10px;
    flex-wrap: wrap; // Allow buttons to wrap
  }

  @media (max-width: 480px) {
    gap: 8px;
    margin: 15px auto;
  }
`;

const CategoryButton = styled.button`
  background: transparent;
  color: #000000;
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
    color: #000000;
    
    &::after {
      width: ${props => props.active ? '6px' : '4px'};
      height: ${props => props.active ? '6px' : '4px'};
    }
  }

  @media (max-width: 767px) {
    font-size: 0.9rem;
    padding: 8px 15px;
    letter-spacing: 0.5px;
  }

  @media (max-width: 480px) {
    font-size: 0.8rem;
    padding: 6px 10px;
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
  
  // Mobile: 4 columns
  @media (max-width: 767px) { // Adjusted breakpoint for 4 columns on mobile
    grid-template-columns: repeat(4, 1fr);
    gap: 15px; // Slightly reduce gap for smaller screens
  }

  // Smallest mobile: if needed, can go to 2 or 3, but targeting 4 as requested
  @media (max-width: 480px) { // Example for very small screens if 4 is too crowded
    grid-template-columns: repeat(3, 1fr); // Fallback to 3 if 4 is too much
    gap: 10px;
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

  @media (max-width: 767px) {
    height: 110px; // Reduced height for 4 columns
    padding: 10px;
  }

  @media (max-width: 480px) {
    height: 100px; // Further reduced height for 3 columns
    padding: 8px;
  }
`;

const TechLogo = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-bottom: 10px;
  filter: drop-shadow(0 0 8px rgba(255, 255, 255, 0.5));

  @media (max-width: 767px) {
    width: 45px;
    height: 45px;
    margin-bottom: 8px;
  }

  @media (max-width: 480px) {
    width: 40px;
    height: 40px;
    margin-bottom: 6px;
  }
`;

const TechName = styled.h3`
  font-size: 1rem;
  color: white;
  text-align: center;
  margin: 0;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);

  @media (max-width: 767px) {
    font-size: 0.8rem;
  }

  @media (max-width: 480px) {
    font-size: 0.75rem;
  }
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
  left: -10px;
  top: 50%;
  width: 25px;
  height: 25px;
  background: #ffc600;
  border-radius: 50%;
  filter: blur(3px);
  box-shadow: 
    0 0 20px 10px rgba(255, 255, 255, 0.8),
    0 0 40px 20px #ffc600;
  z-index: 2;
  pointer-events: none;
  mix-blend-mode: screen;
  transform-origin: left center;
  transform: translateY(-50%);
`;

const LightBeam = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: conic-gradient(
    from 90deg at 0% 50%,
    rgba(0, 0, 0, 0) 260deg,
    rgba(255, 198, 0, 0.1) 280deg,
    rgba(255, 198, 0, 0.2) 300deg,
    rgba(255, 198, 0, 0.3) 330deg,
    rgba(255, 255, 255, 0.5) 350deg,
    rgba(255, 255, 255, 0.6) 360deg,
    rgba(255, 255, 255, 0.5) 370deg,
    rgba(255, 198, 0, 0.3) 390deg,
    rgba(255, 198, 0, 0.2) 420deg,
    rgba(255, 198, 0, 0.1) 440deg,
    rgba(0, 0, 0, 0) 460deg
  );
  mask-image: radial-gradient(
    ellipse at 0% 50%,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.9) 20%,
    rgba(0, 0, 0, 0.6) 50%,
    rgba(0, 0, 0, 0.2) 80%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: screen;
  transform-origin: left center;
  opacity: 0;
`;

const LightParticles = styled(motion.div)`
  position: absolute;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: radial-gradient(
    circle at 50% 50%,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 0.5%
  );
  background-size: 12px 12px;
  mask-image: radial-gradient(
    ellipse at 0% 50%,
    rgba(0, 0, 0, 1) 0%,
    rgba(0, 0, 0, 0.7) 30%,
    rgba(0, 0, 0, 0.3) 60%,
    rgba(0, 0, 0, 0) 100%
  );
  z-index: 1;
  pointer-events: none;
  mix-blend-mode: screen;
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
    { name: 'MongoDB', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/MongoDB_Logo.svg/2560px-MongoDB_Logo.svg.png' },
    { name: 'Microservices', imageUrl: 'https://cdn-icons-png.flaticon.com/512/8636/8636551.png' },
    { name: 'Redis', imageUrl: 'https://cdn.worldvectorlogo.com/logos/redis.svg' },
    { name: 'Docker', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/79/Docker_(container_engine)_logo.png' },
    { name: 'Java', imageUrl: 'https://upload.wikimedia.org/wikipedia/en/3/30/Java_programming_language_logo.svg' },
    { name: 'Express', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/64/Expressjs.png' },
    { name: 'LangGraph', imageUrl: 'https://avatars.githubusercontent.com/u/142261462' },
  ],
  services: [
    { name: 'Stripe', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/ba/Stripe_Logo%2C_revised_2016.svg/2560px-Stripe_Logo%2C_revised_2016.svg.png' },
    { name: 'Strapi', imageUrl: 'https://strapi.io/assets/strapi-logo-dark.svg' },
    { name: 'Shopify', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/Shopify_logo_2018.svg/2560px-Shopify_logo_2018.svg.png' },
    { name: 'AWS', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg' },
    { name: 'Firebase', imageUrl: 'https://firebase.google.com/downloads/brand-guidelines/PNG/logo-logomark.png' },
    { name: 'Vercel', imageUrl: 'https://assets.vercel.com/image/upload/v1588805858/repositories/vercel/logo.png' },
    { name: 'Netlify', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/b/b8/Netlify_logo.svg' },
    { name: 'Cloudflare', imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/9/94/Cloudflare_Logo.png' },
    { name: 'n8n', imageUrl: 'https://avatars.githubusercontent.com/u/45487711' },
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
        }, 1500);
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
      <div className="l-page">
        <TechStackTitle>My Tech Stack</TechStackTitle>
        <CategoryContainer>
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
          <SpotlightOverlay 
            animate={{ opacity: isAnimating ? 0.92 : 0 }}
            transition={{ duration: 0.5 }}
          />
          <LightBeam
            animate={{ 
              opacity: isAnimating ? 0.8 : 0,
              rotate: isAnimating ? [-2, 2, -1] : 0,
              scale: isAnimating ? 1 : 0,
            }}
            transition={{
              opacity: { duration: 0.8 },
              rotate: {
                repeat: Infinity,
                duration: 8,
                ease: "easeInOut",
                repeatType: "mirror"
              },
              scale: { duration: 0.8 }
            }}
          />
          <LightParticles
            animate={{ 
              opacity: isAnimating ? 0.6 : 0,
              backgroundPosition: ["0% 0%", "100% 100%"],
            }}
            transition={{
              opacity: { duration: 0.5 },
              backgroundPosition: {
                repeat: Infinity,
                duration: 60,
                ease: "linear",
              }
            }}
          />
          <Torch
            animate={{ 
              opacity: isAnimating ? 1 : 0,
              scale: isAnimating ? 1 : 0,
              x: isAnimating ? 10 : -10,
            }}
            transition={{ 
              duration: 0.8,
              ease: "easeInOut"
            }}
          />
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
      </div>
  );
};

export default TechStack; 