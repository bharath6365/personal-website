import React from 'react';
import styled from 'styled-components';
import Link from 'next/link';

export default function Button({ label, link }) {
  return (
    <Link href={link}>
      <StyledButton className="button">{label}</StyledButton>
    </Link>
  );
}

const StyledButton = styled.button`
  display: flex;
  position: relative;
  align-items: center;
  border-radius: 5px;
  color: white !important;
  padding: 15px 60px;
  border: 2px solid ${(props) => props.theme.secondary};
  outline: none;
  z-index: 1;
  background: transparent;
  cursor: pointer;
  margin: 10px;
  transition: 0.6s all ease;
  text-transform: uppercase;
  overflow: hidden;

  &:before {
    position: absolute;
    content: '';
    background: ${(props) => props.theme.secondary};
    z-index: -1;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transition: 0.4s all ease;
  }

  &:first-child:before {
    height: 100%;
    width: 0%;
    transform-origin: 50% 50%;
  }

  &:first-child:hover:before {
    width: 100%;
  }

  &:last-child {
    border: 2px solid ${(props) => props.theme.primary};
  }

  &:last-child:before {
    width: 100%;
    height: 0;
    background: ${(props) => props.theme.primary};
    transform: translate(-50%, -50%) rotate(45deg);
  }

  &:last-child:hover {
    color: black !important;
    &:before {
      height: 380%;
    }
  }
`;
