import  { useState, useEffect } from "react";
import axios from "axios";

export default function useCategory() {
  const [categories, setCategories] = useState([]);

  //get cat
  const getCategories = async () => {
    try {
      const { data } = await axios.get(`https://instamart-backend.onrender.com/api/get-category`);
      setCategories(data.category);
    } catch (error) {
      console.log(error);
    }
  };
 

  useEffect(() => {
    getCategories();
  }, []);
   
  return categories;
}
