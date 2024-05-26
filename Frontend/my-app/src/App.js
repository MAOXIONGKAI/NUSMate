import "./App.css";
import Header from "./page/Header";
import Main from "./page/Main";
import Discover from "./page/Discover";
import Profile from "./page/Profile";
import Login from "./page/Login";
import Register from "./page/Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ForgotPassword from "./page/ForgotPassword";
import Activity from "./page/Activity";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Main />}></Route>
        </Routes>
        <Routes>
          <Route path="/discover" element={<Discover />}></Route>
        </Routes>
        <Routes>
          <Route path="/profile" element={<Profile />}></Route>
        </Routes>
        <Routes>
          <Route path="/activity" element={<Activity />}></Route>
        </Routes>
        <Routes>
          <Route path="/login" element={<Login />}></Route>
        </Routes>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
        </Routes>
        <Routes>
          <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
