
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
  padding: 10px 20px;
  border-radius: 3px;
  background: rgba(226, 226, 226, 0.533);
`

export default SingleTag;