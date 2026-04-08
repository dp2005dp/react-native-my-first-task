import Fontisto from '@expo/vector-icons/Fontisto';
import { useContext, useEffect, useState } from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AppContext from '../../context/appContext';
import { cartProduct, deleteCartProduct } from '../../store/cartSlice';

const Cart = () => {
     const[totalPrices , setPrices] = useState<number>(0)
     const cartItems = useSelector((state : any) => state.cartProducts.cartItems) as cartProduct[];
    
     
  
     useEffect(() => {
           const priceTotal = cartItems.reduce((acc:number , item : any) =>  acc  + Number(item.price) * item.quantity , 0)

           setPrices(priceTotal)
     }, [cartItems])
           
     
     
  
     const { isDarkMode } = useContext(AppContext);
     const styles = getStyles(isDarkMode);
     const dispatch = useDispatch()
     
     const onDelteCartItem = (cartId:string) => {
            dispatch(deleteCartProduct(cartId))
     }
     
    return (
            <View style={styles.cartContainer}>
                
                {
                    cartItems.length == 0 ? (
                          <View style={styles.noCartItemContainer}>

                               <Image source={{uri :'https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png'}}   style={styles.noCartItemImage}/>
                                 <Text  style={styles.totalPrices}>Your Cart Is Empty</Text>
                          </View>
                        
                    ) : 

                     (  
                         <> 
                          <View style={styles.logoContainer}>
                                  
                                  <Image source={{uri : 'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'}} style={styles.logo}/>

                           <View style={styles.totalPriceContainer}>
                                          <Text style={styles.totalPrices}>Order Total : <Text style={styles.prices} >{totalPrices}</Text> /-</Text>  
                                         <Text style={styles.cartLength}>{cartItems.length} Items in cart</Text>
                           </View>

                          </View>
                            
                              
                           
                              <FlatList<cartProduct>
                  data = {cartItems}
                  keyExtractor={(item) => item.id}
                  renderItem={({item}) => (
                        <View style={styles.cartItemContainer}>
                                <Image source={{ uri: item.image_url }}  style={styles.productImage}/>
                                <View>
                                       <Text style={styles.productName}>{item.title}</Text>
                                        <Text style={styles.productBrand}>{item.brand}</Text>
                                        <Text  style={styles.quantity}>
                                              Qty :{item.quantity}
                                        </Text>
                                        <View style={styles.flexContainer}>
                                               <Text style={styles.price}>Rs {item.price * item.quantity}/-</Text>
                                               <TouchableOpacity onPress={() => onDelteCartItem(item.id)}>
                                                              <Fontisto name="shopping-basket-remove" size={20} color="black" />

                                               </TouchableOpacity>
                                             
                                        </View> 
                                       
                                </View>
                        </View>
                  )}
                 >

                               </FlatList>
                          </>
                     )
                 }
              

            </View>
         
    )

}


const getStyles = (isDarkMode: boolean) => 
     StyleSheet.create({
      cartContainer:{
      height : '100%',
      width: '100%',
      flexDirection: 'column', 
      backgroundColor : isDarkMode ? '#181818' : 'white',
      padding: 10,
    },
    logo:{
     height: 20,
     width: 130,
     marginTop: 40,
     marginBottom: 30,
     alignSelf : 'flex-start',
   },
      cartItemContainer:{
        boxShadow: '0px 4px 16px 0px #bfbfbfbf',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        marginBottom: 40,
        borderRadius: 10,   
        padding: 10,
       backgroundColor: '#ffffff',
        width:'100%',
     },

  productImage:{
      height: 150,
      width: 150,
      borderRadius: 10,
  },
   productName:{
        fontSize: 18,
        color:  '#334155',
        fontFamily: 'Roboto',
        marginTop: 10,
        marginBottom: 10,    
   },
   productBrand:{
        fontSize: 15,
        color:    '#334155',
        fontFamily: 'Roboto',
   },
     buttonText:{
          color: 'white',
          fontFamily: 'Roboto',
          fontSize: 15,
          textAlign: 'center',
          fontWeight: 'bold',
     },
     flexContainer:{
          flexDirection: 'row',
          gap:30,
          alignItems: 'center',
          marginTop:20,
     },
     logoContainer:{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop:20,
          marginBottom: 40,
     },
     rating:{
          color: 'white',
          fontSize: 20,
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          textAlign: 'center',
     },
     price:{
          color: '#0967d2',
          fontSize: 20,
          fontFamily: 'Roboto',
          fontWeight: 'bold',
     },

     addToCartButton:{
          backgroundColor: 'orange',
          height: 50,
          width: '100%',
          borderRadius: 5,
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          marginBottom: 20,
     },
     addQuentityButton:{
          height: 35,
          width: 35,
          borderColor: 'orange',
          borderWidth: 2,
          borderRadius: 5,
          flexDirection:'column',
          justifyContent: 'center',
          alignItems: 'center',
     },
     quantity:{
          color:     '#000000',
          fontFamily: 'Roboto',
          fontSize: 16,
          marginTop:10,
     },
     totalPrices:{
          color:  isDarkMode ? '#334155' :   '#000000',
          fontFamily: 'Roboto',
          fontSize: 15,
          marginTop:10,
     },
      prices:{
          color:  isDarkMode ? '#334155' :  '#000000',
          fontWeight:'bold'
     },
     cartLength:{
         color:  isDarkMode ? '#334155' :   '#000000',
          fontFamily: 'Roboto',
          fontSize: 18,
          marginTop:10,
     },
     totalPriceContainer :{
           alignSelf: 'flex-end',
           backgroundColor: '#e8e2e2',
           padding: 20,
           borderRadius: 10,
     },
     noCartItemImage : {
           height: 200,
           width: 200,
           marginBottom: 10,
     },
     noCartItemContainer : {
            height: '100%',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
     }
 })




export default Cart;