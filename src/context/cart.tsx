import { addProductToCart } from "@/services/order";
import { IProduct } from "@/types/products.types";
import { ReactNode, createContext, useContext, useState } from "react";

interface CartProps {
  cart: IProduct[];
  addToCart: (product: IProduct) => void;
  deleteFromCart: (product: IProduct) => void;
  setCartProducts: (products: IProduct[]) => void;
  deleteAll: () => void;
}
const CartContext = createContext<CartProps | undefined>(undefined);

export const CartProvider = (props: { children: ReactNode }) => {
  const [cart, setCart] = useState<IProduct[]>([]);

  const setCartProducts = (products: IProduct[]) => {
    setCart(products);
  };

  const addToCart = async (product: IProduct) => {
    const newCart = JSON.parse(JSON.stringify(cart));
    newCart.push(product);
    await addProductToCart(product);
    setCart(newCart);
  };

  const deleteFromCart = (product: IProduct) => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
  };

  const deleteAll = () => {
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, deleteFromCart, deleteAll, setCartProducts }}
    >
      {props.children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const cart = useContext(CartContext);
  if (!cart) {
    throw new Error("useCart should be used inside a CartProvider");
  }
  return cart;
};
