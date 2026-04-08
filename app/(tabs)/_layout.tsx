import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Tabs } from 'expo-router';
import { useContext } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import AppContext from '../../context/appContext';
import store from '../../store';
const Layout = () => {  
  
     const {isDarkMode} = useContext(AppContext);
    
  

  return (
   <Provider  store={store} >

         <SafeAreaView style={{ flex: 1 }}>


   
    
    
    <Tabs screenOptions={{tabBarActiveTintColor : 'rgb(10, 102, 194)' ,  headerShown: false , tabBarStyle: {
    height: 80 ,  backgroundColor:  isDarkMode ? '#000' : '#fff'
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
       

        <Tabs.Screen name="cart" options = {{
          tabBarIcon : ({color , size}) => (
             <FontAwesome name="shopping-cart" size={size} color={color} />
          )
      }} />

    </Tabs>
    
    </SafeAreaView>

   </Provider>
  
)
}

export default Layout;