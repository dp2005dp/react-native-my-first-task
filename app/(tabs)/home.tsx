import { useContext } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AppContext from '../../context/appContext';
const Home = () => {
 const { isDarkMode } = useContext(AppContext);

   const style = getStyles(isDarkMode);

   return (
    <>
       
    
  
  <View style={style.homeContainer}>
       <Image  source={{uri : 'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'}} style={style.homeLogo} />
  
    <Image source= {{uri : 'https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png' }} style={style.homeImage} />
    <View style={style.textContainer}>
           <Text style={style.homeText}>Fashion is part of the daily air and it does not quite help that it
          changes all the time. Clothes have always been a marker of the era and
          we are in a revolution. Your fashion makes you been seen and heard
          that way you are. So, celebrate the seasons new and exciting fashion
          in your own way.</Text>
  </View>
    </View>
      </>
);
}

const getStyles = (isDarkMode: boolean) => 
     StyleSheet.create({
     homeContainer :{
         height : '100%',
         flexDirection: 'column',
         alignItems: 'center',
         backgroundColor : isDarkMode ? '#181818' : 'white',
         padding : 20,
        },
        homeLogoContainer : {
           backgroundColor : isDarkMode ? 'white' : 'black',
        },
        homeLogo:{
            height: 20,
            width: 130,
            marginTop: 40,
            marginBottom: 30,
            alignSelf : 'flex-start',
        },
        textContainer:{
            backgroundColor : isDarkMode ? 'white' : 'black',
            padding : 10,
            borderRadius : 10,
            alignItems : 'center',
        },
        homeImage : {
           height: 350,
           width: 300,
           marginTop : 40,
        },
        homeText:{
            color : isDarkMode ? 'black' : 'white',
            fontFamily : 'Roboto',
            fontSize : 15,
            marginTop : 40,
            marginBottom : 20,
        }
        
      })
     
export default Home;