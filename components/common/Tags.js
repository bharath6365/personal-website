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

const StyledTagsWrapper = styled.div`margin: 30px 0 10px;`;

const StyledTagContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  flex-wrap: wrap;
  text-align: right;
`;

export default Tags;
