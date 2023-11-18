import React, { useEffect, useState } from "react";
import Base from "../../Base/Base";
import "./Address.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SignIn from "../User/SignIn";
import { getAddress } from "../../actions/shippingActions";
import axios from "axios";
import { host } from "../../host";

export default function Address() {
  const {isAdded , address} =useSelector(state=>state.shippingInfoState)
  console.log(address)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const {isAuthenticated,user} = useSelector(state=>state.authState)


    useEffect(() => {
    dispatch(getAddress());
  }, [dispatch]);

  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenAddress, setIsOpenAddress] = useState(false);
  const [isSelectAddress,setIsSelectAddress]=useState(false);

  const [isOpenOrderConfirm, setIsOpenOrderConfirm] = useState(false);

  const toggle = () => setIsOpenLogin(!isOpenLogin);

  const toggle1 = () => setIsOpenAddress(!isOpenAddress);

  const toggle2 = () => setIsOpenOrderConfirm(!isOpenOrderConfirm);

  const toggle3 = ()=>setIsSelectAddress(!isSelectAddress);

  const handleNavigate = ()=>{
    toggle2()
    navigate("/payment")
  }

  const [topping, setTopping] = useState("")

  const optionChange = e => {
    setTopping(e.target.value)
    console.log(topping)
  }


  const checkoutHandler = async (amount, product , shippingInfo , quantity) => {

    const { data: { key } } = await axios.get(`${host}/api/getkey`)

    const { data: { order } } = await axios.post(`${host}/api/payment/checkout`, {
      amount, product
    })

    console.log(order)

    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "InstaMart",
      description: "Tutorial of RazorPay",
      image: "https://avatars.githubusercontent.com/u/25058652?v=4",
      order_id: order.id,
      handler: async (response) => {
        try {
          const verifyUrl = `${host}/api/payment/paymentverification`;
          const { data } = await axios.post(verifyUrl, { response, amount, product , shippingInfo , quantity});

        } catch (error) {
          console.log(error);
        }
      },
      prefill: {
        name: "Maniya",
        email: "maniya@example.com",
        contact: "9999999999"
      },
      notes: {
        "address": "Razorpay Corporate Office"
      },
      theme: {
        "color": "#121212"
      }
    };
    const razor = new window.Razorpay(options);
    razor.open();
  }

  return (
    <Base>

    
      <div className="order-confirm-container">
      {
        isAuthenticated ?  
        <>
      <div className="row user-info-row">
        <div className="col-12 user-info-box">
          <div className="user-info-head">
            <h2>Login</h2>
            <button
              className="change-btn"
              onClick={toggle}
              style={{ display: isOpenLogin ? "block" : "none" }}
            >
              Change
            </button>
          </div>

          <hr />
          <div
            className="row"
            style={{ height: isOpenLogin ? "60px" : "90px" }}
          >
            <div className="col-6 user-info-content">
              <h5>Name: {user.username}</h5>
              <h5 style={{ display: isOpenLogin ? "none" : "block" }}>
                Email : {user.email}
              </h5>
              <Link
                to="/"
                className="user-info-log"
                style={{
                  display: isOpenLogin ? "none" : "block",
                  
                }}
              >
                Logout & Signin to another Account
              </Link>
            </div>
            <div className="col-6">
              <button
                className="checkout-btn"
                onClick={toggle}
                style={{ display: isOpenLogin ? "none" : "block" }}
              >
                Continue Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
            </>
      : <SignIn/>
    }

      <div className="row address-info-row">
      {
        isAdded ? <>
        
        <div className="col-12 address-info-box">
         <div className="address-info-head">
           <h2>DELIVERY ADDRESS</h2>
           <button
             className="change-btn"
             onClick={toggle1}
             style={{ display: isOpenAddress ? "block" : "none" }}
           >
             Change
           </button>
         </div>
         <hr />
         {
          address.map((ad) => (
         <div
           className="row"
          //  style={{ height: isOpenAddress ? "30px" : "140px" }}
         >
           <div className="col-4" style={{ width: "10%", fontSize: "20px" }}>
           
           <input type="radio" value={ad._id} checked={topping === ad._id} onChange={optionChange} />

           </div>
           <div className="col-4" style={{ width: "70%" }}>
           
          {
            ad.length == 0 ? <h5>Please Add Your Address</h5> :    <div className="address-content">
            <h5>{ad.name},{ad.address},{ad.city}</h5>
             <h5>{ad.country}</h5>
            <h5>{ad.postalCode}</h5>
             
            
          </div>
          
          }
          
           </div>
           
           <div className="col-4 address-change-icons" style={{ width: "20%",display:"flex",color:"white" }}>
           <button className="address-edit-btn" onClick={()=>navigate("/add/address")}><i class='bx bx-plus-circle'></i></button>
           <button className="address-edit-btn" onClick={()=>navigate("/editaddress")}><i class='bx bxs-edit-alt'></i></button>
           <button className="address-edit-btn" onClick={()=>navigate("/editaddress")}><i class='bx bx-trash'></i></button>
           </div>
           
           <hr className="address-divider"/>
           
         </div>
         
         
         ))
         
        }
        <div className="deliver-btn">
              <button
                onClick={toggle1}
                style={{ display: isOpenAddress ? "none" : "block" }}
              >
                DELIVER HERE
              </button>
            </div>
       </div>
        

        </> : <h1>null</h1>
      }
      </div>

      <div className="row order-info-row">
        <div className="col-12 order-info-box" >
          <div className="row">
            <div className="col-12">
              <div className="order-info-head">
                <h2>ORDER SUMMERY</h2>
                <button
                  className="change-btn"
                  onClick={toggle2}
                  style={{ display: isOpenOrderConfirm ? "block" : "none" }}
                >
                  Change
                </button>
              </div>
              <hr style={{ display: isOpenOrderConfirm ? "none" : "block" }}/>
            </div>
          </div>
          <div className="row" style={{ display: isOpenOrderConfirm ? "none" : "block" }}>
            <div className="my-orders">
              <div className="order-product-img">
                <img
                  alt=""
                  src="https://rukminim2.flixcart.com/image/l0pm3680/rucksack/h/5/i/unisex-water-proof-mountain-rucksackhiking-trekking-camping-bag-original-imagcfysa33krgk4.jpeg"
                />
              </div>
              <div className="order-product-detail">
                <div className="row">
                  <div className="col">
                    <h5>PLEXY UNISEX Water Proof Mountain Rucksa...</h5>
                  </div>
                </div>
                
              </div>
              <div className="order-product-price">
                <h5> ₹{location.state.p.price*location.state.quantity}</h5>
              </div>
              <div className="order-dispatch-detail">
                <h5>
                  <li>Delivered on Sep 23</li>
                </h5>
                <p>Your item has been delivered</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button className="order-confirm-btn" onClick={() => checkoutHandler(location.state.p.price, location.state.p._id , topping , location.state.quantity)} style={{ display: isOpenOrderConfirm ? "none" : "block" }} >Order Confirm</button>
         </div>

     
    </Base>
  );
};
