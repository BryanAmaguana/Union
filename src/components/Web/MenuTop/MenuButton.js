import React from "react"
import styled from "styled-components"
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button } from "antd";

const MenuButtonWrapper = styled.div`
  border: none;
  box-shadow: 0px 0px 1px rgb(50, 50, 50);
  margin-top: 0.2rem;

  @media only screen and (min-width: 830px) {
    display: none;
  }
`

function MenuButton({ open, handleClick }) {
    return !open ? (
        <MenuButtonWrapper onClick={handleClick}>
            <Button style={{ color: 'red' }} onClick={handleClick} >
                <MenuFoldOutlined />
            </Button>

        </MenuButtonWrapper>
    ) : (
        <MenuButtonWrapper onClick={handleClick}>
            <Button style={{ color: 'red' }} onClick={handleClick} >
                <MenuUnfoldOutlined />
            </Button>
        </MenuButtonWrapper>
    )
}

export default MenuButton
