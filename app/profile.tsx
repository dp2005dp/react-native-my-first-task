import Entypo from '@expo/vector-icons/Entypo';
import Fontisto from '@expo/vector-icons/Fontisto';
import { useContext } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppContext from '../context/appContext';


const Profile = () => {
   
    const { isDarkMode , toggleTheme } = useContext(AppContext);
    const isToggleButton = isDarkMode ? <Fontisto name="toggle-on" size={40} color="white" onPress={toggleTheme}/>  : <Fontisto name="toggle-off" size={40} color="black" onPress={toggleTheme}/> 
    const style = getStyles(isDarkMode);



return (
  <View style={style.exploreMianContainer}>
   
   <View style={style.themeContainer}>
    <Text style={style.admin}>
              Change Theme
        </Text>
       {isToggleButton}
   </View>
   <View style={style.userFlexContainer}>
         <View style={style.userContainer}>
       <Entypo name="user" size={100} color={isDarkMode ? '#f4f4f4' : '#334155'} />

    </View>
        <Text style={style.admin}>
              Admin
        </Text>
   </View>
    
 
  </View>
)
}


const getStyles = (isDarkMode: boolean) => 
     StyleSheet.create({
      exploreMianContainer :{
      height : '100%',  
      flexDirection: 'column',
      padding : 20,
      backgroundColor : isDarkMode ? '#181818' : 'white',
    },
    admin :{
      color : isDarkMode ? '#f4f4f4' : '#334155',
      fontSize : 20,
      fontFamily : 'Roboto',
      marginTop : 20,
    },
    themeContainer : {
      flexDirection : 'column',
      alignItems : 'flex-end',
    },
    userFlexContainer: {
      flexDirection : 'column',
      justifyContent : 'center',
      alignItems : 'center',
      height:'80%',
    },
    userContainer: {
      flexDirection : 'column',
      justifyContent : 'center',
      alignItems : 'center',
      height:200,
      width: 200,
      borderRadius: 100,
      backgroundColor : isDarkMode ? '#4c5158' : '#abc2cd',
    }
  })

export default Profile;