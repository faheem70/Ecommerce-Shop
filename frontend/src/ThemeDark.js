
import { ThemeProvider } from '@material-ui/styles';
import { useState } from 'react';
import Brightness4Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness2';
import { IconButton, createTheme } from '@material-ui/core';
//import { createMuiTheme } from '@material-ui/core';

function ThemeDark() {
    const [toggleDark, settoggleDark] = useState(false);
    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
        },
    });

    // Define theme for light mode
    const lightTheme = createTheme({
        palette: {
            mode: 'light',
        },
    });
    const handleModeChange = () => {
        settoggleDark(!toggleDark);
    }
    return (
        <ThemeProvider theme={toggleDark ? darkTheme : lightTheme}>

            <IconButton onClick={handleModeChange} name="toggleDark"
                color="default">
                {toggleDark ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>

        </ThemeProvider>
    );
}
export default ThemeDark;