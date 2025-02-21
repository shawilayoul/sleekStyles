import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import useProductStore from "../store/productStore";
// eslint-disable-next-line react-refresh/only-export-components
export const ProductsContext = createContext({
  items: [],
  getQauntity: () => {},
  addOneToCart: () => {},
  removerOneFromCart: () => {},
  deleteFromCart: () => {},
  getTotalCost: () => {},
});

// eslint-disable-next-line react/prop-types
const ProductContextProvider = ({ children }) => {
  const [productsInCart, setProductsInCart] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  //geting products from the store
  const { product, getProducts } = useProductStore();

  //filtering products by gender
  const filterProducts = () => {

    if (!filterValue) return product || []; 

    const [category, subcategory] = filterValue.split("/");

    const filteredProducts = (product || []).filter((product) => {
      // If only category is selected
      if (category && !subcategory) {
        return product.category === category;
      }
      // If both category and subcategory are selected
      if (category && subcategory) {
        return (
          product.category === category && product.subcategory === subcategory
        );
      }
      // Default: return all products
      return true;
    });

    return filteredProducts;
  };
  // get qauntity
  const getQauntity = (id) => {
    const qauntity = productsInCart.find(
      (product) => product?.id === id
    )?.qauntity;
    if (qauntity === undefined) {
      return 0;
    }
    return qauntity;
  };

  // get product from the local storage
  useEffect(() => {
    const saveProducts = JSON.parse(localStorage.getItem("products"));
    if (saveProducts) {
      setProductsInCart(saveProducts);
    }
    const fetchGetProduct = async () => {
      await getProducts();
    };
    fetchGetProduct();
  }, []);
  // add product to cart
  const addOneToCart = (id, name, price, image) => {
    const qauntity = getQauntity(id);
    if (qauntity === 0) {
      // the is not in the cart
      setProductsInCart([
        ...productsInCart,
        {
          id,
          qauntity: 1,
          name,
          price,
          image,
        },
      ]);
    } else {
      //product is in the cart
      setProductsInCart(
        productsInCart.map((product) =>
          product.id === id
            ? {
                ...product,
                qauntity: product.qauntity + 1,
              }
            : product
        )
      );
    }
    saveToLocalStorage();
    toast.success("Product has been added Successfully to the cart");
  };
  // delete one from cart
  const removerOneFromCart = (id) => {
    const qauntity = getQauntity(id);
    if (qauntity === 1) {
      deleteFromCart(id);
    } else {
      setProductsInCart(
        productsInCart.map((product) =>
          product.id === id
            ? {
                ...product,
                qauntity: product.qauntity - 1,
              }
            : product
        )
      );
    }
  };
  // delete from cart
  const deleteFromCart = (id) => {
    setProductsInCart(productsInCart.filter((product) => product.id !== id));
    toast.success("the item has been deleted from the cart successfully");
    saveToLocalStorage();
  };
 

  const getTotalCost = () => {
    if (!productsInCart || productsInCart.length === 0) return 0;
  
    let total = 0;
    const cost = productsInCart.reduce(
      (sum, acc) => sum + (acc.price || 0) * (acc.qauntity || 0),
      0
    );
    total += cost;
    return total;
  };
  
 
  // save to local storage
  const saveToLocalStorage = () => {
    localStorage.setItem("products", JSON.stringify(productsInCart));
  };

  //clear cart

  const clearCart = () => {
    setProductsInCart([]);
    saveToLocalStorage();
  };
  
  //admin dasboard functionalities

  const contextValue = {
    items: productsInCart,
    filterProducts: filterProducts(),
    setFilterValue,
    addOneToCart,
    productsInCart,
    getTotalCost,
    deleteFromCart,
    removerOneFromCart,
    clearCart,
  };
  return (
    <ProductsContext.Provider value={contextValue}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductContextProvider;
