import React from 'react';
import Header from './Header';
import Navigation from './Navigation';
import styled from 'styled-components';
// component styles
/*
const Wrapper = styled.div`
    width: 80%;

    @media (min-width: 700px) {
        display: flex;
        top: 130px;
        position: relative;
        height: calc(100% - 64px);
        width: 100%;
        flex: auto;
        flex-direction: column;    
    }
`;
const Main = styled.main`
    position: fixed;
    height: calc(100% - 185px);
    width: 100%;
    padding: 1em;
    overflow-y: scroll;    @media (min-width: 700px) {
        flex: 1;
        margin-left: 220px;
        height: calc(100% - 64px);
        width: calc(100% - 220px);
    }
`;
*/
const Main = styled.main``
const Wrapper = styled.div`
background-color: #bcbebd;

margin: auto;
  width: 80%;
  height: 800px;
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