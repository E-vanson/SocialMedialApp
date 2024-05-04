import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "Scenes/homePage";
import LoginPage from "Scenes/loginPage";
import Navbar from "Scenes/navBar";
import ProfilePage from "Scenes/profilePage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/profile/:userId" element={<ProfilePage/>}/>
        <Route path="/home" element={<HomePage/>}/> 
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
