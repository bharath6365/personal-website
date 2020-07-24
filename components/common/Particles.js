import Particles from 'react-particles-js';
import styled from 'styled-components';
import graphs from '../../data/particles/graphs';
import nasa from '../../data/particles/nasa';


const ParticlesWrapper = ({particleType='graph'}) => {
  const getParticleType = () => {
    if (particleType === 'graph') {
      return graphs;
    } else if(particleType === 'nasa') {
      return nasa;
    }
  }
  return (
    <StyledParticles
      params={getParticleType()}
    />
  )
}

const StyledParticles = styled(Particles)`
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
`

export default ParticlesWrapper;