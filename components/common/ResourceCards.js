import React from 'react';
import styled from 'styled-components';

const ResourceCards = ({ cards, enableVerticalBoxShadow=true }) => {
  return (
    <StyledCardsWrapper>
      {cards.map((card) => {
        return (
          <StyledCard enableVerticalBoxShadow={enableVerticalBoxShadow} key={card._uid} className="small-card">
            <StyledImageContainer>
              <img src={card.image_url} />
            </StyledImageContainer>

            <StyledContent>
              <StyledInitialContent>{card.title}</StyledInitialContent>

              <StyledHoverContent>
                <p>
                  {card.description}
                </p>
              </StyledHoverContent>
            </StyledContent>
          </StyledCard>
        );
      })}
    </StyledCardsWrapper>
  );
}

const StyledCardsWrapper = styled.div`
  display: flex;
  overflow-x: auto;
  padding: 50px 0;
  z-index: 100;
`;

const StyledContent = styled.div`
  margin: 60px 0 20px;
  color: white;
  position: relative;
  overflow: hidden;
`;

const StyledInitialContent = styled.div`
  color: inherit;
  transition: transform 0.25s ease;
  font-size: 1.25rem;
  transform-origin: left center;
  color: #edd5f4;
`;

const StyledHoverContent = styled.div`
  color: inherit;
  opacity: 0;
  transition: all 0.5s ease-in;
  padding: 0 10px;
`;

const StyledImageContainer = styled.div`
  height: 200px;
  margin: -1.5rem;

  img {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
`;

const StyledCard = styled.div`
  min-width: 300px;
  min-height: 350px;
  padding: 1.5rem;
  border-radius: 15px;
  overflow: hidden;
  background: #0f0b18;
  box-shadow: ${(props) => props.enableVerticalBoxShadow ? "-1rem 0 3rem #000": "-1rem 0 1rem #000"};
  transition: all .3s ease; 
  color: white;
  margin: 0;
  cursor: pointer;
  z-index: 300;

  &:hover {
    transform: translateY(-1rem);

    ${StyledHoverContent} {
      opacity: 1;
    }

    ${StyledInitialContent} {
      transform: scale(1.45);
    }

    img {
      filter: blur(0px);
    }  

  }

  &:not(:first-child) {
    margin-left: -130px;
  }
`;


export default ResourceCards;