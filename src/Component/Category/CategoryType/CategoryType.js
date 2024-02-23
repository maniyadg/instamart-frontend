import React, { useEffect, useState } from 'react'
import Base from '../../../Base/Base'
import './CategoryType.css'
import { useParams } from 'react-router-dom';
import axios from 'axios';



export default function CategoryType() {
 const params = useParams();
 const [category,setCategory] = useState();
 const [product,setProduct] = useState([]);

useEffect(()=>{
 if(params.name ){
  getProduct()
 }
},[params.name])

 const getProduct = async()=>{
  const data = await axios.get(`https://instamart-backend.onrender.com/api/product-category/${params.name}`)
  if(data){
    console.log(data)
    setCategory(data.data.category)
    setProduct(data.data.products)
  }

 }
  




  return (
    <Base>
    <div className='category-type-container'>
    <h4 className='type-name'>{category?.name}</h4>
    <div className='row'>
   
    
    {
      
      product.map((p) => (
        <div className='col-12 type-box'>
        <div className='row'style={{width:"100%"}}>
        <div className='col-4 e-img' style={{width:"25%"}}>
        <img src='https://static.toiimg.com/thumb/resizemode-4,msid-97558079,imgsize-200,width-380,imgv-1/97558079.jpg' alt='s23'/>
        </div>
        <div className='col-4 e-info' style={{width:"50%"}}>
        <h3>{p.name}</h3>
        </div>
        <div className='col-4 e-price' style={{width:"25%"}}>
         <h3>₹{p.price}</h3>
        </div>
        </div>
        </div>
      ))
      
    }

  
    </div>
    </div>
    
    </Base>
  )
}
