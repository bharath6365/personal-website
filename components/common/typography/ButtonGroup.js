import React from 'react';
import Button from './Button';
import styled from 'styled-components';
import GlobalConstants from '../../../styles/Global-Constants';

export default function ButtonGroup({buttons}) {
  return (
    <ButtonsWrapper>
      {
        buttons.map((button, i) => {
          return (
            <Button key={i} label={button.label} link={button.link} />
          )
          
        })
      }
    </ButtonsWrapper>
  );
}

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;

  @media ${GlobalConstants.mobileMediaQuery} {
    flex-wrap: wrap;
    button {
      padding: 15px 45px;
    }
  }
`;