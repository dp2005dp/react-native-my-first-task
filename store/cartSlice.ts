import { createSlice } from '@reduxjs/toolkit';

export type cartProduct = {
  id : string;
  title: string;
  price: number;
  brand: string;
  rating: number;
  image_url: string;
  quantity: number;
};

const initialState = { cartItems : [] as cartProduct[] };

const cartSlice = createSlice({
      name : 'cartProducts',
      initialState,
      reducers : {
          addCart : (state , action) => {
            
            const existingItem =  state.cartItems.find((item) => item.id === action.payload.id)
             console.log(existingItem)
            if (existingItem) {
                 existingItem.quantity += 1
            }
            else {
                 state.cartItems.push(action.payload)
            }
           
            
        
          },
          deleteCartProduct : (state , action) => {
             state.cartItems =  state.cartItems.filter((item) => item.id !== action.payload)
          }
      } 
      
})

export const {addCart ,deleteCartProduct } = cartSlice.actions;

export default cartSlice.reducer;