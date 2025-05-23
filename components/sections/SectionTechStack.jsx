import React from 'react';
import styled from 'styled-components';
import SbEditable from 'storyblok-react';
import TechStack from '../TechStack';

const SectionContainer = styled.section`
  padding: 4rem 2rem;
  max-width: 1200px;
  margin: 0 auto;
`;

// Error boundary class component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('TechStack component error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', textAlign: 'center' }}>
          <h3>Something went wrong with the tech stack visualization.</h3>
          <p>Please try refreshing the page.</p>
        </div>
      );
    }

    return this.props.children;
  }
}

const SectionTechStack = ({ blok }) => {
  return (
    <SbEditable content={blok}>
      <SectionContainer>
        <ErrorBoundary>
          <TechStack />
        </ErrorBoundary>
      </SectionContainer>
    </SbEditable>
  );
};

export default SectionTechStack; 