import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import reducer from '../reducer/ProductReducer';


const AppContext = createContext()

const API = 'https://fakestoreapi.com/products'

const initialState ={
    isLoading : false, 
    isError: false, 
    products : [],
    isSinlgleLoading: false,
    singleProduct: {}, 
    cartItem : [],
    isCart : false,
    totalQuantity : 0,
    totalPrice:0

}


const  AppProvider = ({children}) => {

    const [state , dispatch] = useReducer(reducer , initialState)

    // all products api call

    const getProducts = async(url) =>{

        dispatch({type : 'SET_API_LOADING'})

       try {
         const res = await axios.get(url)
         const getProductsData = await res.data
         dispatch({type: 'SET_API_DATA' , payload : getProductsData})
       } catch (error) {
        dispatch({type : 'SET_API_ERROR'})
       }

    }


    //single product api call 

    const  getSingleProduct = async(url)=>{
        dispatch({type : 'SET_SINGLE_LOADING'})
        try {

            const res = await axios.get(url);
            const singleProduct =  res.data
            dispatch({type: 'SET_SINGLE_PRODUCT' , payload : singleProduct})
            
        } catch (error) {
            dispatch({type : 'SET_SINGLE_ERROR'})
        }


    }

    const GetTotalQuantityPrice = ()=>{
        dispatch({type : 'TOTAL_QUANTITY_PRICE'})

        console.log(state.totalPrice)
        console.log(state.totalQuantity)
    }

    const GettingCartItem = (item)=>{

        dispatch({type: 'GETTING_CART_ITEM' , payload : item})

        GetTotalQuantityPrice()

      

        console.log(state.cartItem)

        
    }

    const cartHandling = ()=>{
        dispatch({type : 'CART_HANDLING'})
    }

    const cartItemIncreament = (item , product) =>{
        dispatch({type : 'CART_ITEM_INCREAMENT' , payload: {
            item: item,
            product: product
        }})


        GetTotalQuantityPrice()
    }
    const cartItemDecreament = (item , product) =>{
        dispatch({type : 'CART_ITEM_DECREAMENT' , payload: {
            item: item,
            product: product
        }})


        GetTotalQuantityPrice()
    }

    

    

    useEffect(()=>{
        getProducts(API);

    },[])

    return <AppContext.Provider value={{...state, getSingleProduct , GettingCartItem, cartHandling ,cartItemIncreament ,cartItemDecreament}}>{children}</AppContext.Provider>
}

// custom hook

const useProductContext = () =>{
    return useContext(AppContext)

}
 
export {AppProvider, AppContext , useProductContext}