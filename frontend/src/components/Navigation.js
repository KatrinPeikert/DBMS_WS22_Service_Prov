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
        color: #040F0F !important;
    }
   
    a:hover,
    a:focus {
        color: #880D1E !important;
    }
    overflow: hidden;
`;
//nav-bar:
const Navigation = () => {
    const navigate = useNavigate();
    async function logoutUser() {


        sessionStorage.removeItem("token");
        //redirect user by logout
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
                    <Link to="/">Home </Link>  |
                    <Link to="/search"> Search </Link>
                    |  <Link to="/addService"> Add a new service </Link>
                    | <Link onClick={LogOut}> Logout </Link>
                    | <Link to="/disclaimer"> Disclaimer </Link></div>


            </NavListStyle>
        </Nav>
    );
};
export default Navigation;

