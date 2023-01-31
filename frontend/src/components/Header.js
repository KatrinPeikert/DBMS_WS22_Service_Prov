// header with react bootstrap
import * as React from "react";
import styled from 'styled-components';
import Navigation from './Navigation';

const HeaderStyle = styled.header`
    width: 100%;
    padding: 10px;
    display: flex;
    height: 140px;
    align-items: center;
    background-color: #A2C5AC;
    box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.25);
    z-index: 1;
`;

export default function Header() {
    return (<header>
        <HeaderStyle>
            <h1 >  Web application to review service providers</h1>
            
            
        </HeaderStyle>


        <Navigation />


    </header>)
}


