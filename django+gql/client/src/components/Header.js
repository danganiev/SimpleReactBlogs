import React from 'react'
import { Button } from 'semantic-ui-react'
// import headerStyles from '../styles/header.module.css'
import "../styles/header.css"


export default function Header(){
return (
    <div className="header">
        <a href="#default" className="logo">CompanyLogo</a>
        <div className="headerRight">
            <a className="active" href="#home">Home</a>
            <a href="#contact">Contact</a>
            <Button>
                home page
            </Button>
        </div>
    </div>
)}