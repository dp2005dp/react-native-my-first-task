import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useContext, useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import AppContext from '../context/appContext';
import { products, ProductType } from '../data/products';
import { addCart } from '../store/cartSlice';

    const ProductItemDetails = () => {
    const router = useRouter()
    const {isDarkMode} = useContext(AppContext);
    const styles = getStyles(isDarkMode);
    const product = useLocalSearchParams();
    const [productDetails , setProductDetails] = useState<ProductType[]>([]);
    
    const[quantity , setQuantity] = useState<number>(1);

    useEffect(() => {
        const productData = products.filter(item => item.id === product.id);
        setProductDetails(productData);
    } , [product.id])
    
     const dispatch = useDispatch();

     const incrementQuantity = () => {
            setQuantity((prev) =>  prev >= 1 ? prev + 1 : 1);
     }

      const decrementQuantity = () => {
            setQuantity((prev) =>  prev > 1 ? prev - 1 : 1);
     }
    
     const addToCart = () => {
           dispatch(addCart({
                          ...productDetails[0],quantity
           }))

           router.push({
                  pathname : '/explore',
           })
     }

    return (
            <View style={styles.productMainContainer}>
                   {
                    productDetails.length === 0 ? <Text>Product Not Found</Text> : (

                        <View>
                            {
                                productDetails.map((item) => (
                                <View key={item.id}> 
                                      
                                      <Image source={{ uri: item.image_url }}  style={styles.productImage}/>
                                        <View>
                                               <Text style={styles.productName}>{item.title}</Text>
                                               <Text style={styles.price}>Rs {item.price}/-</Text>
                                        </View> 
                                      

                                         <View style={styles.priceRating}> 
                                        <View  style={styles.ratingContainer}>
                                             <Text style={styles.rating}>{item.rating} </Text>
                                             <Ionicons name="star" size={20} color="orange" />
                                     </View>
                                     </View>

                                     <Text style={styles.productName}>Available: <Text style={styles.productBrand}>In Stock</Text></Text>
                                     
                                     <Text style={styles.productName} >Brand: <Text style={styles.productBrand}>{item.brand}</Text></Text>
                                    </View>
                             ))
                            }
                             
                       
                       
                          <View style={styles.hr}></View>
                          
                          
                          <View style={styles.flexContainer}>
                              
                               <TouchableOpacity style={styles.addQuentityButton} onPress={incrementQuantity}>
                              <Text style={styles.quantity}>+</Text>
                              </TouchableOpacity>
                                 
                                   <Text style={styles.quantity}>{quantity}</Text>

                               <TouchableOpacity style={styles.addQuentityButton} onPress={decrementQuantity}>
                                 <Text style={styles.quantity}>-</Text>
                              </TouchableOpacity>

                          </View>

                           <TouchableOpacity style={styles.addToCartButton} onPress={addToCart}>
                                         <Text style={styles.buttonText}>Add To Cart</Text>
                           </TouchableOpacity>
                        
                        
                        </View>
                             

                    )
                   }
            </View> 
        )

}


const getStyles = (isDarkMode: boolean) => 
     StyleSheet.create({
      productMainContainer:{
      height : '100%',
      flexDirection: 'column',
      padding: 20,
      backgroundColor : isDarkMode ? '#181818' : 'white',
    },
  productImage:{
      height: 350,
      width: '100%',
      borderRadius: 10,
      marginTop: 50,  
  },
   productName:{
        fontSize: 20,
        color:  isDarkMode ?  '#ffffff' :   '#334155',
        fontFamily: 'Roboto',
        marginTop: 10,
        marginBottom: 10,     
   },
   productBrand:{
        fontSize: 20,
        color:  isDarkMode ?  '#ffffff' :   '#334155',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
   },
     buttonText:{
          color: 'white',
          fontFamily: 'Roboto',
          fontSize: 15,
          textAlign: 'center',
          fontWeight: 'bold',
     },
     priceRating:{
          flexDirection: 'row',
          justifyContent: 'space-between',
     },
     ratingContainer:{
          backgroundColor:'#0967d2',
          flexDirection: 'row',
          justifyContent: 'space-around',
          gap: 2,
          height: 35,
          width: 80,
          borderRadius: 5,
          alignItems: 'center',     
     },
     rating:{
          color: 'white',
          fontSize: 20,
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          textAlign: 'center',
     },
     price:{
          color:  isDarkMode ?  '#f4f4f4' :   '#000000',
          fontSize: 22,
          fontFamily: 'Roboto',
          marginBottom: 15,
          fontWeight: 'bold',
     },
     hr:{
          borderBottomColor: isDarkMode ? '#334155' : '#e2e2e2',
          borderBottomWidth: 2,
          marginTop: 20,
          marginBottom: 20,
          width: '100%',
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
     flexContainer:{
          width:150,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
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
          color:  isDarkMode ?  '#f4f4f4' :   '#000000',
          fontFamily: 'Roboto',
          fontSize: 25,
          textAlign: 'center',
     },
 })







export default ProductItemDetails;