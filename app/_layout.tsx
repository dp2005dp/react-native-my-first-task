import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppContext from '../context/appContext';
const Layout = () => {  
  
   const [isTheme, setTheme] = useState<boolean>(false);
   
  const toggleTheme = () => {
     setTheme((prevTheme) => !prevTheme);
  }

  return (
   <SafeAreaView style={{ flex: 1 }}>


   
    <AppContext.Provider value={{isDarkMode : isTheme , toggleTheme}}>
    
    <Tabs screenOptions={{tabBarActiveTintColor : 'rgb(10, 102, 194)' ,  headerShown: false , tabBarStyle: {
    height: 80 ,  backgroundColor:  isTheme ? '#000' : '#fff'
  }}} 
     
     >
      
      <Tabs.Screen name="home" options = {{
          tabBarIcon : ({color , size}) => (
            <MaterialCommunityIcons name="home-circle" size={size} color={color} />
          ),
          
      }} />
       <Tabs.Screen name="explore" options = {{
          tabBarIcon : ({color , size}) => (
             <MaterialIcons name="explore" size={size} color={color} />
          )
      }} />
        <Tabs.Screen name="profile" options = {{
          tabBarIcon : ({color , size}) => (
             <FontAwesome name="user" size={size} color={color} />
          )
      }} />

    </Tabs>
    </AppContext.Provider>
    </SafeAreaView>
)
}

export default Layout;