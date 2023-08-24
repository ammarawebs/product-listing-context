const ProductReducer = (state, action) => {
  switch (action.type) {
    case "SET_API_LOADING":
      return { ...state, isLoading: true };
      break;
    case "SET_API_ERROR":
      return { ...state, isLoading: false, isError: true };
      break;

    case "SET_API_DATA":
      return {
        ...state,
        isLoading: false,
        isError: false,
        products: action.payload,
      };
      break;
    case "SET_SINGLE_LOADING":
      return { ...state, isSinlgleLoading: true };
      break;
    case "SET_SINGLE_PRODUCT":
      return {
        ...state,
        isSinlgleLoading: false,
        singleProduct: action.payload,
      };
      break;
    case "SET_SINGLE_ERROR":
      return { ...state, isSinlgleLoading: false, isError: true };
      break;

    case "CART_HANDLING":
      if (state.isCart === false) {
        return { ...state, isCart: true };
        break;
      } else if (state.isCart === true) {
        return { ...state, isCart: false };
        break;
      }
      break;
    case "GETTING_CART_ITEM":
      const { cartItem } = state; // Destructure cartItem from state
      const productIndex = cartItem.findIndex(
        (item) => item.id === action.payload.id
      );
      console.log(productIndex);

      if (productIndex !== -1) {
        return {
          ...state,
          cartItem: cartItem.map((item, index) => {
            if (index === productIndex) {
                const itemprice = item.price + action.payload.price
                const limitedItemPrice = itemprice.toFixed(2)
                const limitedItemPriceNumber = parseFloat(limitedItemPrice)
              return { ...item, quantity: item.quantity + 1 , price : limitedItemPriceNumber };
            }
            return item;
          }),
        };
      } else {
        return {
          ...state,
          cartItem: [...cartItem, { ...action.payload, quantity: 1   }],
        };
      }
      // No need for 'break' after return
      break;

    case "CART_ITEM_INCREAMENT":
      const productIncreamenttIndex = state.cartItem.findIndex(
        (item) => item.id === action.payload.item.id
      );
      console.log(productIncreamenttIndex);
      return {
        ...state,
        cartItem: state.cartItem.map((item, index) => {
          if (index === productIncreamenttIndex) {
            const incPrice = item.price + action.payload.product.price
            const limitedIncPrice = incPrice.toFixed(2)
            const limitedIncPriceNumber = parseFloat(limitedIncPrice)
            return { ...item, quantity: item.quantity + 1 , price : limitedIncPriceNumber };
          }
          return item;
        }),
      };

      case "CART_ITEM_DECREAMENT":
        const productDecrementIndex = state.cartItem.findIndex(
          (item) => item.id === action.payload.item.id
        );
      
        if (productDecrementIndex === -1) {
          return state; // Item not found, return the current state
        }
      
        const updatedCartItem = state.cartItem
          .map((item, index) => {
            if (index === productDecrementIndex) {
              if (item.quantity > 1) {
                const decPrice = item.price - action.payload.product.price;
                const limitedDecPrice = decPrice.toFixed(2);
                const limitedDecPriceNumber = parseFloat(limitedDecPrice);
                return { ...item, quantity: item.quantity - 1, price: limitedDecPriceNumber };
              } else {
                return null;
              }
            }
            return item;
          })
          .filter((item) => item !== null);
      
        const newTotalQuantity = updatedCartItem.reduce((total, item) => total + item.quantity, 0);
        const newTotalPrice = updatedCartItem.reduce((total, item) => total + item.price * item.quantity, 0);
      
        return {
          ...state,
          cartItem: updatedCartItem,
          totalQuantity: newTotalQuantity,
          totalPrice: newTotalPrice,
        };

      case 'TOTAL_QUANTITY_PRICE':
        if (state.cartItem.length > 0) {
          const updatedCartItems = state.cartItem.map((item) => ({
            ...item, // Keep the existing item properties
          }));
      
          let totalQuantity = 0;
          let totalPrice = 0;
      
          updatedCartItems.forEach((item) => {
            totalQuantity += item.quantity;
            totalPrice += item.price;
          });

          
          const limitedTotalPrice = totalPrice.toFixed(2)

      
          return {
            ...state,
            cartItem: updatedCartItems,
            totalQuantity: totalQuantity,
            totalPrice: parseFloat(limitedTotalPrice),
          };
        }
      
        // If cart is empty, return the state as is
        return state;
      


    default:
      return state;
      break;
  }
};

export default ProductReducer;
