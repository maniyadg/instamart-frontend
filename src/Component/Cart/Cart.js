import React, { useState, useEffect } from "react";
import Base from "../../Base/Base";
import "./Cart.css";
import { useDispatch, useSelector } from "react-redux";
import { delCartItem, getCartItem } from '../../actions/cartActions'
import { toast } from "react-toastify";

export default function Cart() {
  const dispatch = useDispatch()

  const { isAdded, product, error } = useSelector(state => state.cartState)




  useEffect(() => {
    dispatch(getCartItem())
  }, [])



  const [count, setCount] = useState()

  const handleInc = () => {
    setCount(count + 1)
  }
  const handleDec = () => {
    setCount(count - 1)
  }


  const handleDel = (id) => {
    dispatch(delCartItem(id))
    if (error) {
      return (toast(error, {
        type: 'error',
        position: toast.POSITION.BOTTOM_CENTER
      }))
    }
    toast('Item Deleted Successfully', {
      type: 'success',
      position: toast.POSITION.BOTTOM_CENTER
    })
  }


  return (

    <Base>
      {
        isAdded ?
          <div className="cart-box-container">
            {
              product.length == 0 ? <h1 style={{ margin: '15rem 25rem' }}>Your Cart is Empty</h1> :
                <>
                  <div className="cart-container row" style={{ position: "relative" }}>
                    {
                      product.map((item) => (
                        <div className="cart-details-container col-6" style={{ width: "70%" }}>
                          <div className="row cart-box">
                            <div className="col-4" style={{ width: "30%", padding: "0px" }}>
                              <img
                                alt="s23"
                                src={item.product.images[0].image}
                              />
                            </div>
                            <div className="col-4" style={{ width: "50%" }}>
                              <h4 className="cart-product-name">
                                {item.product.name}
                              </h4>
                              <p style={{ color: "#878787" }}>Seller:{item.user}</p>
                              <br />
                              <h4>
                                <strike style={{ color: "#878787" }}>₹1,49,999</strike>{" "}
                                ₹{item.product.price}
                              </h4>
                              <h6 style={{ color: "green", fontWeight: "600" }}>16% Off</h6>
                            </div>
                            <div className="col-4" style={{ width: "20%" }}>
                              <p>
                                Delivery by Sun Sep 24 |
                                <span style={{ color: "green" }}>
                                  <strike style={{ color: "#878787" }}>₹40</strike> Free
                                </span>
                              </p>
                            </div>
                            <div className="cart-add-items row">
                              <div className="stockCounter d-inline">
                                <span className="btn btn-danger minus" onClick={handleDec} >-</span>

                                <input type="number" className="form-control count d-inline"
                                value={item.product.stock} readOnly />

                                <span className="btn btn-primary plus" onClick={handleInc}>+</span>
                              </div>
                              <div className="col-6" style={{ width: "70%", display: "flex" }}>
                                <h6 className="cart-product-name" style={{ fontWeight: "550" }}>SAVE FOR LATER</h6>
                                <h6
                                  className="cart-product-name1"
                                  style={{ paddingLeft: "40px", fontWeight: "550" }}
                                  onClick={() => handleDel(item._id)}
                                >REMOVE</h6>
                              </div>
                            </div>
                          </div>
                        </div>


                      ))
                    }
                    <div className="cart-price-container col-6" style={{ width: "30%" }}>
                      <div className="row cart-price-box">
                        <div className="col-12">
                          <h5 style={{ color: "#878787" }}>PRICE DETAILS</h5>

                          <hr />
                          <div className="row">
                            <div
                              className="col-6"
                              style={{ width: "60%", fontSize: "18px" }}
                            >
                              Price (2 Items)
                            </div>
                            <div
                              className="col-6"
                              style={{ width: "40%", fontSize: "18px" }}
                            >
                              ₹1,50,000
                            </div>
                          </div>
                          <br />
                          <div className="row">
                            <div
                              className="col-6"
                              style={{ width: "60%", fontSize: "18px" }}
                            >
                              Discount
                            </div>
                            <div
                              className="col-6"
                              style={{ width: "40%", fontSize: "18px", color: "green" }}
                            >
                              -₹25,001
                            </div>
                          </div>
                          <br />
                          <div className="row">
                            <div
                              className="col-6"
                              style={{ width: "60%", fontSize: "18px" }}
                            >
                              Delivery Charges
                            </div>
                            <div
                              className="col-6"
                              style={{ width: "40%", fontSize: "18px" }}
                            >
                              <span style={{ color: "green" }}>
                                <strike style={{ color: "#878787" }}>₹40</strike> Free
                              </span>
                            </div>
                          </div>
                          <hr />
                          <div className="row">
                            <div
                              className="col-6"
                              style={{
                                width: "60%",
                                fontSize: "19px",
                                fontWeight: "600",
                              }}
                            >
                              Total Amount
                            </div>
                            <div
                              className="col-6"
                              style={{
                                width: "40%",
                                fontSize: "18px",
                                fontWeight: "600",
                              }}
                            >
                              ₹1,24,999
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <button className="cart-container-btn">PLACE ORDER</button>
                </>
            }
          </div>
          : null

      }
    </Base>
  );
}



