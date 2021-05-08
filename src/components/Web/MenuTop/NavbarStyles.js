import styled from "styled-components"

export const NavbarWrapper = styled.nav`
  display: flex;
  align-items: center;
  position: fixed;
  top: 10vh;
  right: ${props => (props.open ? "0" : "-100%")};
  width: 25vh;
  transition: right 0.4s linear;

  @media only screen and (min-width: 830px) {
    background: red;
    flex-direction: row;
    position: initial;
    height: auto;
    justify-content: center;
    opacity: 100%;
    width: 100%;
  }

  a {
    padding: 0.5rem 0.8rem;
    background: red;
    color: grey;
    width: 100%;
  }
`