import   { useEffect, useState } from "react";
import { PRODUCT_API } from "../constant/apiConstant";
import axios from "axios";
import { useParams } from "react-router-dom";
import "../css/DetailsPage.css"
import useCartStore from "../zustand/store";

const DetailsPage = () => {
  const [product, setProduct] = useState([]);
  const { id } = useParams();
  const addItem = useCartStore((state) => state.addItem)
  useEffect(() => {
    fetchSingleData(id);
  }, [id]);

  const fetchSingleData = async (id) => {
    try {
      const response = await axios.get(`${PRODUCT_API}/${id}`); 
      setProduct(response?.data);
    } catch (error) {
      console.error(`Error in fetching single product`, error);
    }
  };

  const handleAddToCart = ()=>{
    addItem(product);
  }

  return (
    <div className="details-container">
      <h2>Product Details</h2>
      {product ? (
        <div>
          <img src={product.image} alt={product.title} />
          <h3> {product.title} </h3>
          <p> {product.description} </p>
          <p> {product.price} </p>
          <button  onClick={handleAddToCart} className="AddBtn"> Add to cart </button>
        </div>
      ) : (
        <h1>Loading product details...</h1>
      )}
    </div>
  );
};

export default DetailsPage;