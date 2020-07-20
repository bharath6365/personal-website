import Particles from 'react-particles-js';
import styled from 'styled-components';
import graphs from '../../data/particles/graphs';


const ParticlesWrapper = ({}) => {
  return (
    <StyledParticles
      params={graphs}
    />
  )
}

const StyledParticles = styled(Particles)`
  position: absolute;
  width: 100%;
  height: 100%;
`

export default ParticlesWrapper;