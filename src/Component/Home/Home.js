import React, { useEffect, useState } from "react";
import Base from "../../Base/Base";
import "./Home.css";
import useCategory from "../Hooks/useCategory";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../Base/Loader";
import { getProducts } from "../../actions/productsActions";

export default function Home() {
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productsState);
  useEffect(() => {
    dispatch(getProducts(null));
  }, [dispatch]);
  const categories = useCategory();
  const navigate = useNavigate("");

  const handleCategoryNavigate = (categories) => {
    if (categories.name) {
      navigate(`/category/${categories.name}`);
    }
  };

  //get cat

  const handleProductPage =  (p) => {
    console.log(p.name)
    navigate(`/product/${p.name}`,{state:{p}});
  };
  return (
    <Base>
      {loading ? (
        <Loader />
      ) : (
        <div className="container">
        <div className="row">
        <div className="col reel-type-category">
          {categories.map((categories) => (
            <div
              className="category-reel"
              onClick={() => handleCategoryNavigate(categories)}
            >
              <img alt="photo" src={categories.photo} />
              <p style={{fontWeight:"550"}}>{categories.name}</p>
            </div>
          ))}
        </div>
      </div>
          {products &&
            products.map((p, i) => (
              <div className="card" >
                <div className="profile-card">
                  <div className="user-info">
                    <img
                      src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQr_IULLOXJT80cLu-eRqkRGrHY23yLEx4p0w&usqp=CAU"
                      alt="img"
                    />  
                    <h1 className="name">{p.user.username}</h1>
                  </div>
                 
                {  /*<h1>Hello</h1>*/}
                  <button className="button">Follow</button>
                </div>
                
                <hr style={{ margin: "0px 5px" }} className="profile-divider"/>

                <div className="product" onClick={()=>handleProductPage(p)}>
                  <img
                    src={p.images[0].image}
                    alt=""
                  />
                  <div>
                    <h1 className="pro-name">{p.name}</h1>
                    <h1 className="ratings">
                     { /*<Typography component="legend"></Typography>
            <Rating name="read-only" value={value} readOnly className="star"/>*/}
                      51 Ratings
                    </h1>
                    <hr  className="product-divider"/>
                    <h1 className="price">₹{p.price}</h1>
                    <h1 className="stock">In Stock{p.stock}</h1>
                   
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
      
    </Base>
    
  );
}


 
 

