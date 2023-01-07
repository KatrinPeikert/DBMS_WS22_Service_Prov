import { Link } from 'react-router-dom';
import styled from 'styled-components';
const Nav = styled.nav`
    padding: 1em;
    padding-top: 100px;
    background-color: #D3D5D4; 
    overflow: hidden !important;   
    @media (max-width: 700px) {
        padding-top: 160px;
    }
    @media (min-width: 700px) {
        position: fixed;
        width: 220px;
        height: calc(100%);
        overflow-y: scroll;
    }
    
`;
const NavListStyle = styled.ul`
    margin: 0;
    padding: 10;
    list-style: none;
    color:040F0F;
    line-height: 1.5;    
    a {
        text-decoration: none;
        font-weight: bold;
        font-size: 1.1em;
        color: #040F0F;
    }
    a:visited {
        color: #A2C5AC;
    }
    a:hover,
    a:focus {
        color: #880D1E;
    }
    overflow: hidden;
`;

const Sidebar = () => {
    return (
        <Nav>
            <NavListStyle>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/search">Search</Link>
                </li>
                <li>
                    <Link to="/addService">Add a new Service</Link>
                </li>
                <li>
                    <Link to="/register">Register</Link>
                </li>
            </NavListStyle>
        </Nav>
    );
};
export default Sidebar;