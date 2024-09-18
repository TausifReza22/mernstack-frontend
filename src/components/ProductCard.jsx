import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductCards.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";
import { useFilter } from "./FilterContext"; // Import useFilter from the correct path

const ProductCards = () => {
  const imageSize = { width: "150px", height: "150px" };
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setOnFocused] = useState(true);

  // console.log(products.products);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    filterProducts(); // Re-filter products when category or search text changes
  }, [category, searchText, products]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://mern-stack-backend-xzo3.onrender.com/getProducts');
      console.log('responce data', response.data);

      setProducts(response.data.products || []);
      setFilteredProducts(response.data.products || []);
    } catch (error) {
      console.error("Product list fetch karne mein error", error);
    }
  };

  const filterProducts = () => {
    const normalizedSearchText = searchText.toLowerCase();
    setSearchText(normalizedSearchText);

    const filteredData = products.products.filter((product) =>
      product.name.toLowerCase().includes(normalizedSearchText)
    );

    console.log('searchFilteredData', searchFilteredData); // Debugging filtered data

    setFilteredProducts(searchFilteredData);

    const suggestedData = products.products.filter((product) =>
      product.name.toLowerCase().startsWith(normalizedSearchText)
    );
    setSuggestions(suggestedData.slice(0, 5));
  };

  const handleSearch = (searchText) => {
    setOnFocused(true);
    setSearchText(searchText);
    filterProducts(); // Reapply filters on search
  };

  const handleSuggestionClick = (productName) => {
    setSearchText(productName);
    handleSearch(productName);
  };

  const handleToggle = () => {
    setOnFocused(true);
  };

  const handleToggleBlur = () => {
    setOnFocused(false);
  };

  const addToCart = (product) => {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    cartItems.push(product);
    localStorage.setItem('cart', JSON.stringify(cartItems));

    navigate('/cart'); // Redirect to cart page after adding the product
  };

  return (
    <div onClick={handleToggleBlur} style={{ textAlign: "center" }}>
      <input
        type="text"
        className="search-input"
        value={searchText}
        placeholder="Search Products...."
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={handleToggle}
      />

      <div className="suggestions">
        {focused &&
          suggestions.length > 0 &&
          suggestions.map((product, index) => (
            <div
              key={index}
              style={{ border: "1px solid grey", padding: "8px", cursor: "pointer" }}
              onClick={() => handleSuggestionClick(product.name)}
              role="button"
            >
              {product.name}
            </div>
          ))}
      </div>

      <div className="cardWrapper">
        {Array.isArray(filteredProducts) && filteredProducts.length === 0 ? (
          <h1>No Products found</h1>
        ) : (
          Array.isArray(filteredProducts) && filteredProducts.map((product, index) => {
            return (
              <Link
                key={index}
                to={`/product/${product.id}`}
                className="mainCard"
              >
                <div>
                  <img
                    src={product?.image[0]}
                    alt={product?.name}
                    style={imageSize}
                  />
                  <h6> {product?.name} </h6>
                  <h4>$ {product?.price} </h4>
                  <div>
                    <span>{product?.description} </span>
                  </div>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </div>
  );
};

export default ProductCards;
