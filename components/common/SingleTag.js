
import styled from 'styled-components';
const SingleTag = ({tag}) => {
  return (
      <StyledWrapper>
        {tag.title}
        {tag.progress && (
          <StyledProgress progress={tag.progress} />
        )}
      </StyledWrapper>
  )
}

const StyledWrapper = styled.div`
  display: inline-block;
  margin: 0.5rem 0.5rem 0.5rem 0;
  font-size: 0.875rem;
  padding: 5px 10px ;
  border-radius: 3px;
  background: rgb(242 236 227);
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

const StyledProgress = styled.span`
  position: absolute;
  content: '';
  height: 3px;
  width: ${(props => props.progress + '%')};
  left: 0;
  bottom: 0;
  z-index: 1;
  background: #13946e;
`

export default SingleTag;