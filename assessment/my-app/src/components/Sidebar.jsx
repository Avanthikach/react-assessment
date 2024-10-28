import React, { useState } from 'react';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Divider } from '@mui/material';
import { Home, Info, Settings, Menu } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/router';

const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(1),
    ...theme.mixins.toolbar,
}));

const Sidebar = () => {
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

const router=useRouter()

    return (
        <div>
            <Drawer
                variant="permanent"
                sx={{
                    width: open ? drawerWidth : 60,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: open ? drawerWidth : 60,
                        transition: 'width 0.3s',
                        overflowX: 'hidden',
                    },
                }}
            >
                <DrawerHeader>
                    <IconButton onClick={toggleDrawer}>
                        <Menu />
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    <ListItem button onClick={()=>{router.push('/table')}}>
                        <ListItemIcon>
                            <Home />
                        </ListItemIcon>
                        {open && <ListItemText primary="Table" />}
                    </ListItem>
                    <ListItem button onClick={()=>{router.push('/calender')}}>
                        <ListItemIcon>
                            <Info />
                        </ListItemIcon>
                        {open && <ListItemText primary="Calendar" />}
                    </ListItem>
                  
                </List>
            </Drawer>
        </div>
    );
};

export default Sidebar;
