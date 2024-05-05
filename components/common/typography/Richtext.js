/*
  Component that will handle rendering for anything wrt Rich Text Content.
*/
import styled from 'styled-components';
import Storyblok from '../../../utils/storyblok-client';


const StyledRichTextWrapper = styled.div`
  color: ${props => props.textColor || 'black'};
`;

const StyledPre = styled.pre`
  white-space: pre-wrap;
  word-wrap: break-word;
`;




const RichText = ({content, textColor}) => {

  function createMarkup(storyblokHTML) {
    let HTML = Storyblok.richTextResolver.render(storyblokHTML);

    // Remove the class names as it will be set on the parent.
    HTML = HTML.replace(/class=\".+\"/, '');
  return {
    __html: HTML,
  }
}
 
  return (
    <StyledRichTextWrapper textColor={textColor}>
      {content && content.map(text => {
          const textContent = text.content && text.content[0];
          // Text Attrs Level will give you 1,2,3,4,5,6. Use this for constructing h1 to h6.
          let ElementTag = `div`;
          switch (text.type) {
            case "heading":
              ElementTag = `h${text.attrs.level}`;
            break;
            
            case "paragraph":
              ElementTag = `p`
            break;

            case "code_block":
              ElementTag = StyledPre
            break;

            case "bullet_list":
              ElementTag = "ul"
            break;

            case "ordered_list":
              ElementTag = "ol"
            break;

            case "horizontal_rule":
              ElementTag = `hr`
            break;
          }

          if (textContent) {
            return (
            <ElementTag 
              className={textContent.marks && textContent.marks[0].attrs?.class}
              dangerouslySetInnerHTML={createMarkup(text)}
            />
          )
          } else {
            return <ElementTag />
          }
          
        
      })}
    </StyledRichTextWrapper>
  )
}


export default RichText;