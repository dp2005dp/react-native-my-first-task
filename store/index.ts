import { configureStore } from '@reduxjs/toolkit';
import cartSlice from './cartSlice';

const store = configureStore({
      reducer : {
           cartProducts : cartSlice     
      }
})


export default store;