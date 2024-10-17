import axios from "axios";
import { create } from "zustand";
//const apiUrl = "http://localhost:8000";

const useProductStore = create((set) => ({
  product: null,
  isloading: false,
  error: null,
  addProduct: async (products) => {
    set({ isloading: true, error: null });
    try {
      const response = await axios.post(`https://sleekstyles.onrender.com/uploads`, products,{
        headers: {
            'Content-Type': 'multipart/form-data'
        }});
      set({ product: response.data.product, isloading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "error adding product",
        isloading: false,
      });
      throw error;
    }
  },

  editProduct: async (productId,products) => {
    set({ isloading: true, error: null });
    try {
      const response = await axios.put(`https://sleekstyles.onrender.com/uploads/${productId}`, products,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },});
      set({ product: response.data.product, isloading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "error adding product",
        isloading: false,
      });
      throw error;
    }
  },
 
  //get all products
  getProducts: async () => {
    set({ isloading: true, error: null });
    try {
      const response = await axios.get("https://sleekstyles.onrender.com/api/products");
      set({ product: response.data, isloading: false });
    } catch (error) {
      set({
        error: error.response.data.message || "error getting product",
        isloading: false,
      });
      throw error;
    }
  },
}));

export default useProductStore;
