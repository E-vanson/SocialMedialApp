import { useState } from "react";
import { 
    Box,
    IconButton,
    InputBase,
    Typography,
    Select,
    MenuItem,
    FormControl,
    useTheme,
    useMediaQuery } 
    from "@mui/material";

import {
    Search,
    Message,
    DarkMode,
    LightMode,
    Notifications,
    Help,
    Menu,
    Close
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setMode, setLogout } from "state";
import { useNavigate } from "react-router-dom";
import FlexBtwn from "components/FlexBtwn";

const Navbar = ()=>{
    // the value to determine if we open the mobile menu in small screens
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

    // used to dispatch actions from the reducers
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector((state)=> state.user);

    //hook in mui used to determine is current screen size of user is below the min-width or higher than min-width
    const isNonMobileScreens = useMediaQuery("min-width: 1000px");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    //access users fullname
    const fullName = `${user.firstName} ${user.lastName}`;

    return(<div>Navbar</div>)
}

export default Navbar;