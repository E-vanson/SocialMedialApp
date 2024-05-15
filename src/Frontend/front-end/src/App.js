import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import HomePage from "Scenes/homePage";
import LoginPage from "Scenes/loginPage";
import Navbar from "Scenes/navBar";
import ProfilePage from "Scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import {createTheme} from "@mui/material/styles"
import { themeSettings } from "theme";

function App() {
  const mode = useSelector((state)=> state.mode);
const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
   
      <BrowserRouter>
      <ThemeProvider theme={theme} >
        {/* resets our css */}
        <CssBaseline/>
      <Routes>
        <Route path="/" element={<LoginPage/>}/>
        <Route path="/profile/:userId" element={<ProfilePage/>}/>
        <Route path="/home" element={<HomePage/>}/> 
      </Routes>
      </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
