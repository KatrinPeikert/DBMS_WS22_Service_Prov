import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes ,Route} from "react-router-dom"
import FrontPage  from "./pages/frontpage"
import LoginPage from "./pages/login"
import SearchPage from"./pages/search"
import Header from "./header";
function App() {
  return (
    <><Header />
    <Routes>
    <Route path="/" element={<FrontPage />}></Route>
    <Route path="/login" element={<LoginPage />}></Route>
    <Route path="/search" element={<SearchPage />}></Route>
    </Routes></>     
    
    )
}

export default App;
