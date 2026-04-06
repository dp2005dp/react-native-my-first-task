import { Ionicons } from '@expo/vector-icons';
import { useContext, useEffect, useMemo, useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AppContext from '../context/appContext';
import { categories, CategoryOption } from '../data/categories';
import { products, ProductType } from '../data/products';



// type CategoryOption = {
//     id: string;
//     name: string;
//     isSelected: boolean;
// }





// const categoryOptions = [
//   {
//     name: 'clothes',
//     id: '1',
//     isSelected: false,
//   },
//   {
//     name: 'Electronics',
//     id: '2',
//     isSelected: false,
//   },
//   {
//     name: 'Appliances',
//     id: '3',
//     isSelected: false,
//   },
//   {
//     name: 'Grocery',
//     id: '4',
//     isSelected: false,
//   },
// ]



const Explore = () => {
    const { isDarkMode } = useContext(AppContext);
    const styles = getStyles(isDarkMode);
   const [productList, setProductList] = useState<ProductType[]>([]);
   const [searchInput, setSearchInput] = useState<string>('');
   const [showFilter , setShowFilter] = useState<boolean>(false);
   const [categoryList, setCategoryList] = useState<CategoryOption[]>(categories);
   
   
    useEffect(() => {
      const fetchProductData = () => {
            setProductList(products);
            
      }

      fetchProductData();
    } , [])

   const userInput = (value:string) => {
        setSearchInput(value);
   }
    
  const filteredProducts = useMemo(() => {
        return products.filter((product) =>
            product.image_url.split('ecommerce/')[1].split('-')[0].includes(searchInput.toLowerCase().trim())
        
        );
        
   }, [searchInput, productList]);
   
   
 
   const onSerach = () => {

        setProductList(filteredProducts);
        setSearchInput('');
   }
   
   const addCategory = (categoryId:string) => {

         setCategoryList((prevCategoryOptions) => prevCategoryOptions.map((eachOption) => {
                    if (eachOption.id === categoryId) {

                         const updatedOption =  !eachOption.isSelected;
                        return { ...eachOption, isSelected: updatedOption}
                        
                    }
                    return eachOption;
                }));

          }
     
          
   
   const onSavefilter = () =>{
     
     if (categoryList.every((category) => category.isSelected === false)) {
          setProductList(products);
          setShowFilter(false);
          alert('Please select at least one category to apply filter');
          return;
     }

     const selectedCategories = categoryList.filter((category) => category.isSelected).map((category) => category.name.toLowerCase());
      
      
     

    const filtered = products.filter((product) =>
    selectedCategories.some((category) =>
      product.image_url.split('ecommerce/')[1].split('-')[0].includes(category)
    )
     
  );
   
 
  setProductList(filtered);
  setShowFilter(false);

   }
 
   const isShowClearFilter = categoryList.some((category) => category.isSelected);

   const onClear = () => {
     setCategoryList(categoryList.map((category) => ({ ...category, isSelected: false })));
     setProductList(products);
   }
   
   return (

    <View style={styles.exploreMianContainer}>
        <Image source={{uri : 'https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png'}} style={styles.logo}/>
       
        <  View style={styles.exploreContainer}>
         <View style={styles.searchcontainer}>
              <TextInput  placeholder='Search' style={styles.input} onChangeText={userInput} value={searchInput}/>
              <Ionicons name="search" size={22} color="grey"  onPress={onSerach}/>
         </View>
          
           <Ionicons name="filter-outline" size={40} color={isDarkMode ? '#cccccc' : '#334155'}  onPress={() => setShowFilter(!showFilter)}/>
            
        </View>
        
        
         {
           productList.length === 0 ? (
                 <View style={styles.noproductsContainer}>
                     <Text style={styles.text}>No products found 🔍</Text>
                     <Text style={styles.text}>Try different search keyword</Text>
                 </View>

           ) : 
           (  
               <>
               {
                   isShowClearFilter && 
                   
                   <View style={styles.buttonConatiner}>
                       <TouchableOpacity style={styles.clearFilterButton}  onPress={onClear} >
                               <Text style={styles.buttonText}>Clear filter</Text>
                       </TouchableOpacity>
                   </View>
                  
               }
               <Text style={styles.text}>All Products</Text>
                 <FlatList<ProductType> 
            data={productList}
            numColumns={2} 
            renderItem={({item}) => (
               <View style={styles.flexContainer}>
                        <View style={styles.flexColumnContainer}>
                            <Image source={{uri : item.image_url}} style={styles.productImage}/>
                                <Text style={styles.productName}>{item.title}</Text>
                                <Text style={styles.productBrand}>{item.brand}</Text>
                                <View style={styles.priceRating}>
                                        <Text style={styles.price}>₹ {item.price}</Text>
                                        <View style={styles.ratingContainer}> 
                                             <Text style={styles.rating}>{item.rating}</Text>
                                             <Ionicons name="star" size={12} color="orange" />
                                        </View>
                                </View>
                        </View>
                </View>
            )}
            
            keyExtractor={(item) => item.id.toString()}
          />
          </>
           )
         }

         <Modal visible={showFilter} animationType='slide' transparent={true}>
              <View style={styles.modulMainContainer}>
                   <View style={styles.modalContainer}> 
                       <View style={styles.closeIcon}>
                                  <Ionicons name="close" size={40} color="grey"  onPress={() => setShowFilter(!showFilter)}/>
                         </View> 
                         
              
                         <Text style={styles.text} >Category Options</Text>
                          {
                               categoryList.map((catagory) =>    (
                                    <Text key={catagory.id} style={[
                                                  styles.notSelectedCategory,
                                                  catagory.isSelected && styles.userSelectCategory
                                              ]}
                                              
                                              onPress={() => addCategory(catagory.id)}
                                              >{catagory.name}</Text>
                               ) 
                               
                              )
                          }

                          <TouchableOpacity style={styles.filterButton} onPress={onSavefilter}>
                              <Text style={styles.buttonText}>Apply filter</Text>
                          </TouchableOpacity>
                       </View>
                 </View>
           </Modal>

           
        
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
     exploreContainer :{
       flexDirection: 'row',
       justifyContent: 'space-between',
       alignItems: 'center',
       gap: 10,
        },
    searchcontainer:{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: 50,
        borderWidth: 1,
        borderColor: '#cbd5e1',
        backgroundColor:  isDarkMode ? '#4c5158' : '#abc2cd',
        borderRadius: 10,
        marginTop: 10,
        padding: 10,
        outline: 'none',
        width: 300,
    },
    input: {
       borderWidth: 0,
       height: 45,
       width: 250,
       color:  isDarkMode ?  '#ffffff' :   '#64748b',
       fontSize: 18,
  },
  image: {
    width: 350,
    height: 200,
    marginTop: 20,
  },
  text:{
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
    color:  isDarkMode ?  '#cccccc' :   '#1e293b',
  },
  productImage:{
      height: 150,
      width: 150,
      borderRadius: 10,
      marginTop: 10,
      
  },
   productName:{
        fontSize: 12,
        color:  isDarkMode ?  '#ffffff' :   '#334155',
        fontFamily: 'Roboto',
   },
   productBrand:{
        fontSize: 10,
         color:  isDarkMode ?  '#ffffff' :   '#334155',
        fontFamily: 'Roboto',
        fontWeight: 'bold',
   },
   flexContainer:{
   
   },
   flexColumnContainer:{
    flexDirection: 'column',
    justifyContent: 'flex-start',
    gap: 10,
    marginBottom: 20,
    marginRight: 20,
   },
   logo:{
     height: 20,
     width: 130,
     marginTop: 40,
     marginBottom: 30,
   },
   noproductsContainer:{
    height: '80%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: 'Roboto',
    fontSize: 16,
    fontWeight: 'bold',
     color:  isDarkMode ?  '#ffffff' :   '#334155',
   },
   modulMainContainer:{
    flexDirection: 'column',
    alignItems: 'center',
   },
     modalContainer:{
      height: '100%',
      width: '100%',
      backgroundColor:    isDarkMode ? '#181818' : 'white',
      borderRadius: 10,
      padding: 20,
     },
     userSelectCategory:{
      backgroundColor:    isDarkMode ? '#334155' : '#e2e8f0',
      fontWeight: 'bold',
      fontFamily: 'Roboto',
      fontSize: 20,
      padding: 10,
      color:  isDarkMode ?  '#ffffff' :   '#334155',
     },
     notSelectedCategory:{
      backgroundColor: 'transparent',
      opacity: 0.5,
      fontSize: 18,
      marginTop: 10,
      marginBottom: 10,
      color:  isDarkMode ?  '#ffffff' :   '#334155',
     },
     filterButton:{
          backgroundColor:    isDarkMode ? '#3b82f6' : '#3b82f6',
          padding: 10,
          borderRadius: 10,
          height: 40,
          width: 120, 
          marginTop: 50,     
     },
     buttonText:{
          color: 'white',
          fontFamily: 'Roboto',
          fontSize: 15,
          textAlign: 'center',
     },
     buttonConatiner:{
          flexDirection: 'row',
          justifyContent: 'flex-end',
          marginTop: 20,
     },
     clearFilterButton:{
          backgroundColor:'grey',
          borderRadius: 10,
          padding: 10,
          height: 40,
          width: 100,
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
          height: 20,
          width: 45,
          borderRadius: 5,
          alignItems: 'center',     
     },
     rating:{
          color: 'white',
          fontSize: 12,
          fontFamily: 'Roboto',
          fontWeight: 'bold',
          textAlign: 'center',
     },
     price:{
          color:  isDarkMode ?  '#f4f4f4' :   '#64748b',
          fontSize: 18,
          fontFamily: 'Roboto',
     },
     closeIcon:{
          flexDirection: 'row',
          justifyContent: 'flex-end',
     }
      })



export default Explore;