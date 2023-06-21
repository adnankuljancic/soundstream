import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home/Home";
import { LogIn } from "./components/LogIn/LogIn";
import "bootstrap/dist/css/bootstrap.min.css";
import { MainNavBar } from "./components/NavBar/NavBar";
import { Register } from "./components/Register/Register";
import { PageNotFound } from "./components/PageNotFound/PageNotFound";
import { MySongs } from "./components/MySongs/MySongs";
import UserContext from "./context/UserContext";
import { useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loggedIn = async () => {
      const token = localStorage.getItem("token");
      const decoded = jwt_decode(token);

      if (token) {
        setUserData({
          fullName: decoded.fullName,
          userId: decoded.userId,
          token: token,
        });
        return true;
      } else return false;
    };

    loggedIn();
  }, []);

  return (
    <div className="App">
      <Router>
        <UserContext.Provider value={{ userData, setUserData }}>
          <MainNavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/my-songs" element={<MySongs />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
