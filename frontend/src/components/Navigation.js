import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useNavigate } from "react-router-dom";

const Nav = styled.nav`
height: 60px;
text-align: justify   

`;
const NavListStyle = styled.div`
background-color: darkgrey;
    margin: 10px;
    display: flex;
    padding: 10;
    color:040F0F;
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

const Navigation = () => {
    const navigate = useNavigate();
    async function logoutUser() {


        sessionStorage.removeItem("token");
        return fetch('/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
            .then(data => data.json())
            .catch(error => {
                navigate("/error")
            })
    }


    const LogOut = async e => {
        e.preventDefault();
        await logoutUser();
        navigate("/")
        window.location.reload(false);


    }

    return (
        <Nav>
            <NavListStyle>

                <div><b>Navigation:</b>
                    <Link to="/">Home</Link>  |
                    <Link to="/search">Search </Link>
                    |  <Link to="/addService">Add a new Service</Link>
                    | <Link onClick={LogOut}>Logout</Link></div>


            </NavListStyle>
        </Nav>
    );
};
export default Navigation;

/* styled nav old:
padding: 1em;
    width: 100%;

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
*/