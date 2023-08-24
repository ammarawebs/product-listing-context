import { useContext, useEffect, useReducer, useState } from 'react';
import axios from '../axios';
import Header from '../components/Navbar';
import {AppContext, useProductContext} from '../context/ProductContext'
import Products from '../components/Products';



const initialState = []
const intial_error = ''
const initial_selectedItems = []
const initial_loading = true

  const Reducer = (state , action) =>{

    switch(action.type){
      case 'GETTING_DATA' :
         
        return action.payload 
        break
      // case 'ERROR_HANDLING' : 
      //   return action.payload
      //   break
    }
  }

  const Reducer_error = (state , action)=>{


    switch(action.type){
      case 'ERROR_HANDLING' : 
        return action.payload
        break
    }
  }

  const Reducer_loading = (state , action)=>{
    switch(action.type){
      case 'LOADING' : 
        return action.payload
        break
    }
  }

  const Reducer_selectedItems = (state, action) =>{
    switch(action.type){
        case 'GETTING_ID' : 

            const productIndex = state.findIndex((item)=> item.id === action.payload.id)

            if(productIndex !== -1 ){
              return state.map((item, index) => {
                if (index === productIndex) {
                  return { ...item, quantity: item.quantity + 1 };
                }
                return item;
              });
            }
            else {
              return [...state, { ...action.payload, quantity: 1 }];
            }
          
          break
      }

    }
    




const HomePage = ({productLink}) => {


    const [Data, dispatch] = useReducer(Reducer , initialState ) 
    const [isError , dispatch_error] = useReducer(Reducer_error , intial_error) 
    const [isLoading , dispatch_loading] = useReducer(Reducer_loading , initial_loading)
    const [selectItems , dispatch_selectedItems] = useReducer(Reducer_selectedItems , initial_selectedItems)
   
    
    // const [myData , setMyData] = useState()


    const {myName} = useProductContext()
  
    const GettingApiData = async() =>{
      try{
  
        const res = await axios.get('/products').finally(()=>dispatch_loading({type : 'LOADING' , payload : false}))
        dispatch({type: 'GETTING_DATA', payload: res.data})
  
      }
      catch(error)
      {
        dispatch_error({type: 'ERROR_HANDLING', payload : error.message})
      }
      
  
  
    }


  
  
  
  
    
  
  
  
    // console.log(selectItems)



  return (
    <>
    
    <div className='center' >
    
    <Products/>
    
    {/* {isError !== '' ? <h1>{isError}</h1> : isLoading ? <h1>Loading...</h1> :
      <div className='second_main'>
      {
        
        Data.map((post, index)=>{
          
          const {id ,title , category, description ,image,price } = post 
          return <div className='card' key={id}>
            <div className='card_img_section'>
              <img src={image} alt="" className='card_image'/>
            </div>
            
            <div className='product_detail_section'>
            <h3 className="card_cat">{category}</h3>
            <button className='product_link' onClick={()=>productLink(post)} ><h2 className='card_title'>{title}</h2></button>
            <p className='price'>$ {price}</p>
            <button className='buy_btn' onClick={()=>dispatch_selectedItems({type : 'GETTING_ID' , payload : post })}>Add to Cart</button>
            
            </div>
           
            
          </div>
        })
        }
      </div>} */}
    </div>
    </>
  )
}

export default HomePage