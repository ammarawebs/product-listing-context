import React, { useEffect, useReducer } from 'react'
import { FaShoppingCart } from "react-icons/fa";



import { Link } from 'react-router-dom';
import Sidebar from './Sidebar';
import { useProductContext } from '../context/ProductContext';




const Navbar = () => {

const { isCart, cartHandling, totalQuantity } = useProductContext()


  return (
    <>
    <div className='header_main'>
        <div className="header_second_main">
            <Link to='/'><h1 className='logo'>Fake Store</h1></Link>
            <div className='cart'>
              <button  className='cart_btn' onClick={()=> {cartHandling()}}>
                <FaShoppingCart size='30px'/><div className="cart_header_quantity"><p>{totalQuantity}</p></div>
              </button>
              

              
            </div>
        </div>

        
    </div>

    { isCart ? <Sidebar /> : <></> }

    

        </>
  )
}

export default Navbar