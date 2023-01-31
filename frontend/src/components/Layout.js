import React from 'react';
import Header from './Header';
import styled from 'styled-components';

const Main = styled.div`
overflow:scroll; 
overflow-x: hidden;
max-height: 900px !important;
padding: 10px;
position: relative;
`


const Wrapper = styled.div`
background-color: #bcbebd;

margin: auto;
  width: 80%;
  max-height: 1200px;
  border: 3px solid black;
  padding: 10px;
  margin-top: 50px;`

const Layout = ({ children }) => {


    return (
        <React.Fragment>
           
            <Wrapper>
            <Header />
            <Main>{children}</Main>  
            </Wrapper>
        </React.Fragment>
    );
};
export default Layout;

//    