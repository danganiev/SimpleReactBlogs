import React from 'react'
import styled, { css } from 'styled-components'
import "../styles/header.css"

const Header = styled.div`
    overflow: hidden;
    background-color: #f1f1f1;
    padding: 20px 10px;
`

const HeaderButton = styled.a`
    float: left;
    color: black;
    text-align: center;
    padding: 12px;
    text-decoration: none;
    font-size: 18px;
    line-height: 25px;
    border-radius: 4px;

    &:hover {
        background-color: #ddd;
        color: black;
    }

    ${props => props.active && css`
        background-color: dodgerblue;
        color: white;
    `}
`

const PureButton = styled.a.attrs({
    className: "pure-button"
})``

const HeaderLogo = styled.a`
    font-size: 25px;
    font-weight: bold;
`

export default function HeaderDiv(){
return (
    <Header>
        <HeaderLogo>CompanyLogo</HeaderLogo>
        <div className="headerRight">
            <HeaderButton active>Home</HeaderButton>
            <HeaderButton>Contact</HeaderButton>
            <PureButton>Contact</PureButton>
        </div>
    </Header>
)}