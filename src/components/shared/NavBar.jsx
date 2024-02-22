import { AppBar, Button, Menu, MenuItem, IconButton, Toolbar, Typography, Divider } from "@mui/material";
import MoreVertIcon  from '@mui/icons-material/MoreVert';
import AndroidIcon from '@mui/icons-material/Android';
import useWindowDimensions from "../hooks/useWindowDimensions"
import React,{ useState } from "react";
import { Link } from "react-router-dom";

export default function NavBar({appBarRef, interactables}){
    const { height, width } = useWindowDimensions();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleMenuClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };

    return (
        <AppBar ref={appBarRef}>
        <Toolbar>
            <IconButton
                color="inherit"
                edge="start"
            >
                <AndroidIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
                Leave Management System
            </Typography>

            <div style={{flex:1}}/>

            <ButtonOptionMethods interactables={interactables} mobile={width < 600} anchorEl={anchorEl} handleMenuClick={handleMenuClick} handleMenuClose={handleMenuClose}/>

        </Toolbar>
        </AppBar>
    )
}

function ButtonOptionMethods({startup, interactables,mobile, anchorEl, handleMenuClick, handleMenuClose}){
    if (mobile) return (
        <>
            <IconButton color="inherit" onClick={handleMenuClick} >
                <MoreVertIcon />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                {interactables
                    .map((item,idx) => {
                        if (item.type == "link"){
                            return (
                                <Link key={idx} to={item.url} style={{ textDecoration: 'none' }}>
                                <MenuItem style={{textTransform:"capitalize", minWidth:100}}>{item.name}</MenuItem>
                                </Link>
                            )
                        } else if (item.type == "btn") {
                            return <MenuItem key={idx} onClick={item.fn} style={{minWidth: 100}}>{item.name}</MenuItem>
                        }
                    }
                )}
            </Menu>
        </>
    )
    return (
        <>
            {interactables
                .map((item,idx) => {
                    if(item.type == "link"){
                        return (
                            <React.Fragment key={idx}>
                            <Link to={item.url} style={{ textDecoration: 'none', all:"unset" }}>
                                <Button color="inherit" variant="outlined">{item.name}</Button>
                            </Link>
                            {idx < interactables.length - 1 && <Divider orientation="vertical"/>}
                            </React.Fragment >
                        )
                    } else if(item.type == "btn"){
                        return (<React.Fragment key={idx}>
                        <Button color="inherit" variant="outlined" onClick={item.fn}>{item.name}</Button>
                        {idx < interactables.length - 1 && <Divider orientation="vertical"/>}
                        </React.Fragment >)
                    }
                }
            )}
        </>
    )
}