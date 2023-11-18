import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getProducts } from '../../actions/productsActions';
import Base from "../../Base/Base";
import Loader from '../../Base/Loader';
import { toast } from 'react-toastify';
import { Rating, Typography } from '@mui/material';
import { addCartItem } from '../../actions/cartActions';


const ProductSearch = () => {

  const navigate = useNavigate()
  const { error} = useSelector(state => state.cartState)

  const handleclick = (id , quantity) =>{
    dispatch(addCartItem(id,quantity))
    if(error){
      return (toast(error,{
        type: 'error',
        position: toast.POSITION.BOTTOM_CENTER
    }))
    }
    toast('Cart Item Added!',{
        type: 'success',
        position: toast.POSITION.BOTTOM_CENTER
    })  }


    const dispatch = useDispatch()

    const {keyword} = useParams()

    const { products, loading } = useSelector((state) => state.productsState);

    useEffect(()=>{
        console.log(keyword)
        dispatch(getProducts(keyword)) 
    }, [dispatch,keyword])

    console.log(products)

  return (
    <Base>
    {loading ? (
      <Loader />
    ) :  <>
    {
        products.map((product)=>(   <div className="product-container">
        <div className="row product-img-row">
        

        <div className="col-4 product-images" style={{ width: "35%" }}>
            <div className="product-img-box">
            { /* <img
                src={img}
                onChange={(e)=>setImg(e.target.value)}
                alt="product"
    />*/}
            </div>
            <div className="p-images">
            {
              products.map((im)=>(
                <div className="img-slide">
                <img
                  alt=""
                  src={im.image}
                  
                />
              
              </div>
              ))
             }
            </div>
         
              
    
           
          </div>
          <div className="col-4 product-buy" style={{ width: "50%" }}>
            <h3>{product.name}</h3>
            <h2>₹{product.price}</h2>
            <h3>In Stock :{product.stock} </h3>
            <Typography component="legend">No rating given</Typography>
            <Rating name="no-value" value={null} />
            <div className="product-buy-btn">
            <button 
             style={{ background: "#bf00ff", color: "white" }}
             disabled={product.stock==0?true:false} 
             onClick={()=>{
                handleclick(product._id )
            }}
            >
              <i class="bx bx-cart" ></i> Add
              to cart
            </button>
            <button style={{ background: "#7fff84" }} onClick={() => navigate("/address")}>
              <i class="bx bxs-truck"></i> Buy Now
            </button>
          </div>
          </div>
      
          
        </div>
        <div className="row product-decription-row">
          <div className="col-12 product-details" style={{ width: "100%" }}>
            <div className="product-detail-box">
              <h2>Product Details</h2>
              <hr />
              <ul>
                <li>{product.description}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>))
    }
    </> 
  }
      
    </Base>
  )
}

export default ProductSearch
