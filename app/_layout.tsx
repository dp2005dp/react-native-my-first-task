import { Stack } from 'expo-router';
import { useState } from 'react';
import { Provider } from 'react-redux';
import AppContext from '../context/appContext';
import store from '../store';

const RootLayout = () => {

const [isTheme, setTheme] = useState<boolean>(false);
   
  const toggleTheme = () => {
     setTheme((prevTheme) => !prevTheme);
  }
    
    
    return (
    
      <Provider  store={store} >
               <AppContext.Provider value={{isDarkMode : isTheme , toggleTheme}}>
         
                  <Stack screenOptions={{ headerShown: false }}/>
               
               </AppContext.Provider>

      </Provider>
   
         
)
}


export default RootLayout;