
import React from 'react';
import Sidebar from '../components/Sidebar';
import { Box } from '@mui/material';

const Layout = ({ children }) => {
    return (
        <Box sx={{ display: 'flex' }}>
          
            <Sidebar />

          
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    width: '100%',
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default Layout;
