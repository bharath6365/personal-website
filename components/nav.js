import Link from 'next/link';
import styled from 'styled-components';

const Nav = ({ settings }) => (
  <NavStyled>
    <NavWrapper className="l-page">
      <LogoWrapper>
        <a>My Logo...</a>
      </LogoWrapper>

      <ContentWrapper>
        {settings &&
          settings.content.main_navi.map((navItem, index) => {
            return (
              <Link href="googe.com" key={index}>
                <a>{navItem.name}</a>
              </Link>
            );
          })}
      </ContentWrapper>
    </NavWrapper>
  </NavStyled>
);

export default Nav;

const NavStyled = styled.nav`
  background: black;
  padding: 20px;
  color: white;

  a {
    color: white;
    text-decoration: none;
  }
`;

const NavWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const LogoWrapper = styled.div`
  flex: 1;
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
