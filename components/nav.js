import Link from 'next/link';
import { useState, Fragment } from 'react';
import styled from 'styled-components';
import { Spin as Hamburger } from 'hamburger-react'

import GlobalConstants from '../styles/Global-Constants';
import GlobalTheme from '../styles/Global-Theme';

const Nav = ({ settings }) => {
  const [ isOpen, setOpen ] = useState(false);
  return (
    <Fragment>
      <NavStyled>
        <NavWrapper className="l-page">
          <Link href="/">
            <StyledLogoWrapper>
              <img src="/images/logo.png" />
            </StyledLogoWrapper>
          </Link>

          <ContentWrapper>
            {settings &&
              settings.content.main_navi.map((navItem, index) => {
                return (
                  <Link href={navItem.link.url} key={navItem._uid}>
                    <a>{navItem.name}</a>
                  </Link>
                );
              })}
          </ContentWrapper>
        </NavWrapper>
      </NavStyled>

      <NavStyledMobile>
        <Hamburger toggled={isOpen} toggle={setOpen} />
      </NavStyledMobile>

      <StyledMobileNav className={isOpen ? 'active' : ''}>
        <Link href="/">
          <StyledLogoWrapper>
            <img src="/images/logo.png" />
          </StyledLogoWrapper>
        </Link>

        <StyledMobileLinks>
          {settings &&
            settings.content.main_navi.map((navItem, index) => {
              return (
                <Link href={navItem.link.url} key={navItem._uid}>
                  <a>{navItem.name}</a>
                </Link>
              );
            })}
        </StyledMobileLinks>
      </StyledMobileNav>
    </Fragment>
  );
};

export default Nav;

const NavStyled = styled.nav`
  background: black;
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: ${GlobalConstants.navHeight + 'px'};
  z-index: 1000;
  display: flex;

  a {
    color: white;
    text-decoration: none;
  }

  @media ${GlobalConstants.mobileMediaQuery} {
    display: none;
  }
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLogoWrapper = styled.div`
  flex: 1;
  cursor: pointer;

  @media ${GlobalConstants.mobileMediaQuery} {
    text-align: center;
    margin-bottom: 20px;
  }

  img {
    width: 50px;
    height: 50px;
  }
`;

const ContentWrapper = styled.div`
  &:hover a {
    filter: blur(1px);
  }
  a {
    margin: 0 40px;
    padding-bottom: 5px;
    font-size: 1.25rem;
    letter-spacing: 0.5px;
    text-transform: capitalize;
    font-weight: 500;
    position: relative;
  }

  a::before {
    position: absolute;
    content: '';
    left: 0;
    bottom: 0;
    width: 100%;
    transform-origin: 0 0;
    transform: scaleX(0);
    height: 3px;
    background: #ffc600;
    transition: transform 0.3s ease;
  }

  a:hover {
    filter: blur(0);
  }

  a:hover:before {
    transform: scaleX(1);
  }
`;

const NavStyledMobile = styled.div`
  display: none;

  @media ${GlobalConstants.mobileMediaQuery} {
    display: block;
    position: fixed;
    top: 10px;
    right: 15px;
    z-index: 10000;
    transform: skewX(-10deg);
    background: ${GlobalTheme.primary};
  }
`;

const StyledMobileNav = styled.div`
  position: fixed;
  width: 55vw;
  height: 100vh;
  top: 0;
  left: 0;
  transform: translateX(-200%);
  z-index: 1000;
  background: rgb(45 14 36 / 0.95);
  border-right: 2px solid rgb(226, 226, 226);
  transition: transform 1s cubic-bezier(.42,.97,.52,1.49);

  &.active {
    transform: translateX(0);

  }

  a {
    position: relative;
    font-size: 1.375rem;
    padding: 10px 0;
    display: block;
    color: white;
    text-decoration: none;
    text-align: center;

    &:before {
      position: absolute;
      content: '';
      width: 100%;
      height: 100%;
      background: ${props => props.theme.primary};
      left: 0;
      top: 0;
      transform: translateX(-1000%);
      transition: transform 0.4s ease;
      z-index: -1;
    }

    &:hover {
      color: black;

      &:before {
        transform: translateX(0);
      }
    }
  }
`;

const StyledMobileLinks = styled.div``;
