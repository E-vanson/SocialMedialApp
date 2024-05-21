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
    // <script src="http://localhost:3001"></script>
    // the value to determine if we open the mobile menu in small screens
    const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);

    // used to dispatch actions from the reducers
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const user = useSelector((state)=> state.user);

    //hook in mui used to determine is current screen size of user is below the min-width or higher than min-width
    const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

    const theme = useTheme();
    const neutralLight = theme.palette.neutral.light;
    const dark = theme.palette.neutral.dark;
    const background = theme.palette.background.default;
    const primaryLight = theme.palette.primary.light;
    const alt = theme.palette.background.alt;

    //access users fullname
    // const fullName = `${user.firstName} ${user.lastName}`;
    const fullName = user ? `${user.firstName} ${user.lastName}` : 'Guest Person';


    return(
        <FlexBtwn padding="1rem 6%" backgroundColor={alt}>
            <FlexBtwn gap="1.75rem">
                <Typography
                fontWeight = "bold"
                fontSize = "clamp(1rem, 2rem, 2.25rem)"
                color = "primary"
                onClick = {()=>navigate("/home")}
                sx= {{
                    "&:hover":{
                        color:primaryLight,
                        cursor:"pointer"
                    }
                }}
                >
                    Chatty
                </Typography>
                {isNonMobileScreens && (
                    <FlexBtwn 
                        backgroundColor={neutralLight}
                        borderRadius="9px"
                        gap="3rem"
                        padding="0.1rem 1.5rem"
                    >
                        <InputBase placeholder="Search..."/>
                        <IconButton>
                            <Search/>
                        </IconButton>
                    </FlexBtwn>  
                )}
            </FlexBtwn>

            {/* DESKTOP NAV */}
            {isNonMobileScreens ?
             (
             <FlexBtwn gap="2rem">
                <IconButton onClick={()=> dispatch(setMode())}>
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{fontSize:"25px"}}/>
                    ) : (
                        <LightMode sx={{color: dark, fontSize: "25px"}}/>
                    )}
                </IconButton>
                <Message sx={{fontSize: "25px"}}/>
                <Notifications sx={{fontSize:"25px"}}/>
                <Help sx={{fontSize:"25px"}}/>
                <FormControl variant="starndard" value = {fullName}>
                    <Select 
                    value={fullName}
                    sx={{
                        backgroundColor: neutralLight,
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root":{
                            pr: "0.25rem",
                            width: "3rem"
                        },
                        "& .MuiSelect-select: focus":{
                            backgroundColor: neutralLight
                        }
                    }}
                    input={<InputBase/>}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={()=> dispatch(setLogout())}>Log Out</MenuItem>
                    </Select>
                </FormControl>
             </FlexBtwn>)
             :(
                <IconButton
                onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}
                >
                    <Menu/>
                </IconButton>
             )}

             {/* Mobile Nav */}
             {!isNonMobileScreens && isMobileMenuToggled && (
                <Box
                position="fixed"
                right="0"
                bottom="0"
                height="100%"
                zIndex="10"
                maxHeight="500px"
                minWidth="300px"
                backgroundColor={background}
                >
                    {/* Close Icon */}
                    <Box display="flex" justifyContent="flex-end" p="1rem">
                        <IconButton onClick={()=> setIsMobileMenuToggled(!isMobileMenuToggled)}>
                            <Close/>
                        </IconButton>
                    </Box>

                    {/* Menu Items */}
                    <FlexBtwn display="flex" flexDirection="column" justifyContent="center" alignItems="center" gap="3rem">
                <IconButton
                 onClick={()=> dispatch(setMode())}
                 sx={{fontSize:"25px"}}
                 >
                    {theme.palette.mode === "dark" ? (
                        <DarkMode sx={{fontSize:"25px"}}/>
                    ) : (
                        <LightMode sx={{color: dark, fontSize: "25px"}}/>
                    )}
                </IconButton>
                <Message sx={{fontSize: "25px"}}/>
                <Notifications sx={{fontSize:"25px"}}/>
                <Help sx={{fontSize:"25px"}}/>
                <FormControl variant="starndard" value = {fullName}>
                    <Select 
                    value={fullName}
                    sx={{
                        backgroundColor: neutralLight,
                        width: "150px",
                        borderRadius: "0.25rem",
                        p: "0.25rem 1rem",
                        "& .MuiSvgIcon-root":{
                            pr: "0.25rem",
                            width: "3rem"
                        },
                        "& .MuiSelect-select: focus":{
                            backgroundColor: neutralLight
                        }
                    }}
                    input={<InputBase/>}
                    >
                        <MenuItem value={fullName}>
                            <Typography>{fullName}</Typography>
                        </MenuItem>
                        <MenuItem onClick={()=> dispatch(setLogout())}>Log Out</MenuItem>
                    </Select>
                </FormControl>
                </FlexBtwn>
                </Box>
             )}
        </FlexBtwn>
    )
}

export default Navbar;