
import styled from 'styled-components';
const SingleTag = ({tag}) => {
  return (
      <StyledWrapper>
        {tag.title}
      </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: inline-block;
  margin: 0.5rem;
  font-size: 1rem;
  padding: 8px 15px ;
  border-radius: 3px;
  background: rgba(226, 226, 226, 0.533);
  position: relative;
  cursor: pointer;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 3px;
    background: ${(props) => props.theme.primary};
  }
`

export default SingleTag;