import { ShopContext } from "./Context";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ShopContextProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const currency = "$";
  const delivery = 10;
  const backendUrl = import.meta.env.VITE_BACKENDURL;
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  const addTOCart = async (itemId, size, setSize) => {
    if (!size) {
      toast.error("Please select a size", {
        hideProgressBar: true,
        autoClose: 5000,
      });
      return;
    }
    let cartItemsCopy = structuredClone(cartItems);
    if (cartItems[itemId]) {
      if (cartItems[itemId][size]) {
        cartItemsCopy[itemId][size] += 1;
      } else {
        cartItemsCopy[itemId][size] = 1;
      }
    } else {
      cartItemsCopy[itemId] = {};
      cartItemsCopy[itemId][size] = 1;
    }
   
    if (!token) {
      toast.error("Please login to add to cart", {
        hideProgressBar: true,
        autoClose: 5000,
      });
      return;
    }
    setCartItems(cartItemsCopy)
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/add`,
          { itemId, size },
          { headers: { token } }
        );
        toast.success("Item added to cart", {
          hideProgressBar: true,
          autoClose: 5000,
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to add to cart", {
          hideProgressBar: true,
          autoClose: 5000,
        });
      }
    }
  };

  function getCartCount() {
    let totalcount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalcount += cartItems[items][item];
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalcount;
  }

  const UpdateQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId][size] = quantity;
    setCartItems(cartData);
    if (token) {
      try {
        await axios.post(
          `${backendUrl}/api/cart/update`,
          { itemId, size, quantity },
          { headers: { token } }
        );
        toast.success("Item updated in cart", {
          hideProgressBar: true,
          autoClose: 5000,
        });
      } catch (error) {
        console.log(error);
        toast.error("Failed to update cart", {
          hideProgressBar: true,
          autoClose: 5000,
        });
      }
    }
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let getPriceFromProduct = products.find(
        (product) => product._id === items
      );

      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalAmount += cartItems[items][item] * getPriceFromProduct.price;
          }
        } catch (error) {
          console.log(error);
        }
      }
    }
    return totalAmount;
  };

  const getProductData = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/products/getall`);
      if (response.data.success) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message, {
          hideProgressBar: true,
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message, { hideProgressBar: true, autoClose: 5000 });
    }
  };
  const getUserCart = async (token) => {
   
    try {
      const response = await axios.post(
        `${backendUrl}/api/cart/get`,
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setCartItems(response.data.cartData);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };
  useEffect(() => {
    getProductData();
    setToken(localStorage.getItem("token"));
    
    if(localStorage.getItem("token")){
      getUserCart(localStorage.getItem("token"))
    }
  
  }, []);

  const value = {
    token,
    setToken,
    products,
    currency,
    delivery,
    backendUrl,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    addTOCart,
    cartItems,
    getCartCount,
    UpdateQuantity,
    getCartAmount,
    navigate,
    setCartItems,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
