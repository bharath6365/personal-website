import styled from 'styled-components';
import Tag from './SingleTag';
const Tags = ({ content }) => {
  return (
    <StyledTagsWrapper>
      {content.heading && <h2>{content.heading}</h2>}

      <StyledTagContainer>
        {content.tags_list.map((tag) => 
          <Tag key={tag.title} tag={tag} />)}
      </StyledTagContainer>
    </StyledTagsWrapper>
  );
};

const StyledTagsWrapper = styled.div`
  margin: 5px 0 20px;

  &:last-child {
    margin-bottom: 0;
  }
`
;

const StyledTagContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  text-align: right;
`;

export default Tags;
