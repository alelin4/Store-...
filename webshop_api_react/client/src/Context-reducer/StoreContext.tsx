import React, { createContext, useReducer, ReactNode } from "react";
import reducer, { initialState } from "./storeReducer";

interface StoreProviderProps {
  children: ReactNode;
}

interface Product {
  _id: string;
  price: number;
  description: string;
  title: string;
  image: URL;
  // Add other product properties here
}

interface StoreContextValue {
  total: number;
  products: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (product: Product) => void;
}

export const StoreContext = createContext<StoreContextValue | null>(null);

export const StoreProvider: React.FC<StoreProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const addToCart = (product: Product) => {
    const updatedCart = [...state.products, product];
    updatedPrice(updatedCart);

    dispatch({
      type: "add",
      payload: updatedCart,
    });
  };

  const removeFromCart = (product: Product) => {
    const productIndex = state.products.findIndex(
      (currentProduct) => currentProduct._id === product._id
    );
  
    if (productIndex !== -1) {
      const updatedCart = [...state.products];
      updatedCart.splice(productIndex, 1);
      updatedPrice(updatedCart);
  
      dispatch({
        type: "remove",
        payload: updatedCart,
      });
    }
  };
  

  const updatedPrice = (products: Product[]) => {
    let total = 0;
    products.forEach((product) => {
      total += product.price;
    });

    dispatch({
      type: "update price",
      payload: total,
    });
  };

  const value: StoreContextValue = {
    total: state.total,
    products: state.products,
    addToCart,
    removeFromCart,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  );
};
