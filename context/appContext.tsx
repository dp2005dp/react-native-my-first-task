import React from 'react';

type Theme = {
     isDarkMode: boolean;
     toggleTheme: () => void;
}


const AppContext = React.createContext<Theme>({
        isDarkMode: false,
        toggleTheme: () => {},
})

export default AppContext;