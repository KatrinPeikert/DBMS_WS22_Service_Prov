import './App.css';
import { Routes ,Route} from "react-router-dom"

import FrontPage  from "./pages/frontpage"
import LoginPage from "./pages/login"
import Header from "./header";
function App() {
  return (
    <><Header />
    <Routes>
    <Route path="/" element={<FrontPage />}></Route>
    <Route path="/login" element={<LoginPage />}></Route>
    </Routes></>     
    
    )
}

export default App;

/*
        <Routes>
          <Route path="/" elemtent={<FrontPage />}></Route>
          <Route path="/:id" elemtent={<LoginPage />}></Route>
      </Routes>     
*/
