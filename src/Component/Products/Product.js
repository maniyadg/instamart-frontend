import React, { useEffect, useState } from "react";
import "./Product.css";
import Base from "../../Base/Base";
import { Rating, Typography } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../actions/productsActions";
import { addCartItem } from "../../actions/cartActions";
import { toast } from "react-toastify";

export default function Product() {
  const navigate = useNavigate("");
  const location = useLocation()

  const { error} = useSelector(state => state.cartState)


  console.log(location.state.p.name)

  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productsState);
  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const [quantity, setQuantity] = useState(1);

  const increaseQty = () => {
      const count = document.querySelector('.count')
      if(location.state.p.stock ==0 ||  count.valueAsNumber >= location.state.p.stock) return;
      const qty = count.valueAsNumber + 1;
      setQuantity(qty);
  }
  const decreaseQty = () => {
      const count = document.querySelector('.count')
      if(count.valueAsNumber == 1 ) return;
      const qty = count.valueAsNumber - 1;
      setQuantity(qty);
  }

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
   

  const handleNavigate = (p , quantity) => {
    navigate(`/address/${p.name}` , {state:{p,quantity}})
  } 

  return (
    <Base>
      <div className="product-container">
        <div className="row product-img-row">
          <div className="col-4 product-images" style={{ width: "25%" }}>
            <div className="product-img-box">
              <img
                src={location.state.p.images[0].image}
                alt="product"
              />
            </div>
            {
              location.state.p.images.map((im) => (
                <div className="img-slide">
                  <img
                    alt=""
                    src={im.image}
                  />

                </div>
              ))
            }



          </div>
          <div className="col-4 product-buy" style={{ width: "50%" }}>
            <h3>{location.state.p.name}</h3>
            <h2>₹{location.state.p.price}</h2>
            <h3>In Stock :{location.state.p.stock} </h3>
            <Typography component="legend">No rating given</Typography>
            <Rating name="no-value" value={null} />

            <div className="stockCounter d-inline">
              <span className="btn btn-danger minus" onClick={decreaseQty} >-</span>

              <input type="number" className="form-control count d-inline" value={quantity} readOnly />

              <span className="btn btn-primary plus" onClick={increaseQty}>+</span>
            </div>

            <div className="product-buy-btn">
              <button 
               style={{ background: "#bf00ff", color: "white" }}
               disabled={location.state.p.stock==0?true:false} 
               onClick={()=>{
                  handleclick(location.state.p._id , quantity)
              }}
              >
                <i class="bx bx-cart" ></i> Add
                to cart
              </button>
              <button style={{ background: "#7fff84" }} 
              onClick={() => handleNavigate(location.state.p , quantity)}>
                <i class="bx bxs-truck"></i> Buy Now
              </button>
            </div>
          </div>
          <div className="col-4 product-reviews" style={{ width: "25%" }}>
            <div className="reviews-box">
              <h3>Reviews</h3>
              <hr />
              <ul>
                <li>kjukyfga</li>
                <li>uguykf</li>
              </ul>
              <div className="review-input">
                <input placeholder="Write Your Reviews" />
                <button
                  style={{
                    background: "skyblue",
                    width: "40px",
                    textAlign: "center",
                    borderRadius: "5px",
                  }}
                >
                  <i class="bx bx-send"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="row product-decription-row">
          <div className="col-12 product-details" style={{ width: "100%" }}>
            <div className="product-detail-box">
              <h2>Product Details</h2>
              <hr />
              <ul>
                <li>kjgiykfliagdiuqlgf</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </Base>
  );
}
