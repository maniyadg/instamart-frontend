import React, { useState } from "react";
import "./Topbar.css";
import Search from "../Search";
import { useNavigate } from "react-router-dom";
import { useSelector } from 'react-redux'

export default function Topbar() {

  const navigate = useNavigate("");
  const { isAuthenticated,user} = useSelector((state)=>(state.authState))
  const [keyword, setKeyword] = useState();

  const handleClick = async (e) => {
    e.preventDefault();
    navigate(`/search/${keyword}`);
  };
  const [isOpen, setIsOpen] = useState();

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
    {
      isAuthenticated ? <div className="topbar">
      <nav className="nav-items">
        <ul>
          <Search />
          <li onClick={() => navigate("/cart")}>
            <i class="bx bx-cart-alt"></i>
          </li>
          <li>home</li>
          <li>
            <span className="t-icon">
              <i class="bx bx-bell"></i>
            </span>
          </li>
          <li>
            <span className="t-icon">
              <i class="bx bx-cart"></i>
            </span>
          </li>
          <li>home</li>
          <li>{user.username}</li>
   <li><img alt='img' src={ user.avatar ?? 'https://cdn-icons-png.flaticon.com/512/21/21104.png'} className="image" style={{width:"50px",height:"50px",borderRadius:"50%",border:"3px solid rgb(151, 71, 226)"}}/></li>
        </ul>
      </nav>
      <nav className="nav-mobile-items">
        <ul>
          <h3 className="home-logo">InstaMart</h3>

          <li className="home-src">
            <input
              type="text"
              placeholder="search for..."
              style={{
                borderRadius: "20px",
                paddingLeft: "20px",
                width:"80px",
                display: !isOpen ? "none" : "block",
              }}
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
            <i
              class="bx bx-search-alt"
              style={{ display: !isOpen ? "block" : "none" }}
              onClick={toggle}
            ></i>
          </li>
          <h6>
            <i
              class="bx bx-search-alt mobile-src"
              onClick={handleClick}
              style={{ display: !isOpen ? "none" : "block" }}
            ></i>
          </h6>
          <li>
            <i class="bx bx-bell" ></i>
          </li>
          <li>
            <i class="bx bx-cart" onClick={()=>navigate("/cart")}></i>
          </li>
          <li>
            <i class="bx bx-user" onClick={()=>navigate("/profile")}></i>
          </li>
        </ul>
      </nav>
    </div>
     :    <div className="topbar">
      <nav className="nav-items">
        <ul>
          <Search />
          <li onClick={() => navigate("/cart")}>
            <i class="bx bx-cart-alt"></i>
          </li>
          <li>home</li>
          <li>
            <span className="t-icon">
              <i class="bx bx-bell"></i>
            </span>
          </li>
          <li>
            <span className="t-icon">
              <i class="bx bx-cart"></i>
            </span>
          </li>
          <li>home</li>
          <li>home</li>
          {/*    <li>{accessToken.user.username}</li> 
   <li><img alt='img' src={accessToken.user.avatar} className="image" style={{width:"50px",height:"50px",borderRadius:"50%",border:"3px solid rgb(151, 71, 226)"}}/></li>*/}
        </ul>
      </nav>
      <nav className="nav-mobile-items">
        <ul>
          <h3 className="home-logo">InstaMart</h3>

          <li className="home-src">
            <input
              type="text"
              placeholder="search for..."
              style={{
                borderRadius: "20px",
                paddingLeft: "20px",
                width:"80px",
                display: !isOpen ? "none" : "block",
              }}
              onChange={(e) => setKeyword(e.target.value)}
              value={keyword}
            />
            <i
              class="bx bx-search-alt"
              style={{ display: !isOpen ? "block" : "none" }}
              onClick={toggle}
            ></i>
          </li>
          <h6>
            <i
              class="bx bx-search-alt mobile-src"
              onClick={handleClick}
              style={{ display: !isOpen ? "none" : "block" }}
            ></i>
          </h6>
          <li>
            <i class="bx bx-bell" ></i>
          </li>
          <li>
            <i class="bx bx-cart" onClick={()=>navigate("/cart")}></i>
          </li>
          <li>
            <i class="bx bx-user" onClick={()=>navigate("/profile")}></i>
          </li>
        </ul>
      </nav>
    </div>
            }
    </>
    
    );
}
