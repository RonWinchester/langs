import { createTheme, MantineProvider, MantineColorsTuple } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

import { AppRouter } from "./lib/router/AppRouter";

const myColor: MantineColorsTuple = [
    '#ecf4ff',
    '#dce4f5',
    '#b9c7e2',
    '#94a8d0',
    '#748dc0',
    '#5f7cb7',
    '#5474b4',
    '#44639f',
    '#3a5890',
    '#2c4b80'
  ];
  
  const theme = createTheme({
    colors: {
        blue: myColor,
    }
  });

function App() {
    return (
        <MantineProvider theme={theme}>
            <BrowserRouter>
                <AppRouter />
            </BrowserRouter>
        </MantineProvider>
    );
}

export default App;
