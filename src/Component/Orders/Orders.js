import React from 'react'
import Base from '../../Base/Base'
import './Orders.css'

export default function Orders() {
  return (
    <Base>
    <div className='orders-container'>
    <div className='search-orders'>
   <input type='text' placeholder='Search For...' />
   <button className='order-search-btn'>SEARCH</button>
    </div>
    <div className='my-orders'>
    <div className='order-product-img'>
    <img alt='' src='https://rukminim2.flixcart.com/image/l0pm3680/rucksack/h/5/i/unisex-water-proof-mountain-rucksackhiking-trekking-camping-bag-original-imagcfysa33krgk4.jpeg'/>
    </div>
    <div className='order-product-detail'>
    <div className='row'>
    <div className='col'>
    <h5>PLEXY UNISEX Water Proof Mountain Rucksa...</h5>
    </div>
    </div>
    <div className='row'>
    <div className='col-6' style={{color:"#878787"}}>
    Color : Purple 
    </div>
    <div className='col-6' style={{color:"#878787"}}>
    Size : XXL
    </div>
    </div>
    </div>
    <div className='order-product-price'>
    <h5> ₹604</h5>
    </div>
    <div className='order-dispatch-detail'>
   <h5><li>Delivered on Sep 23</li></h5> 
    <p>Your item has been delivered</p>
    </div>
    </div>
    </div>
    </Base>
  )
}
