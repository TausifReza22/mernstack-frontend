import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductCards.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Link } from "react-router-dom";

const ProductCards = () => {
  const imageSize = { width: "150px", height: "200px" };
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setOnFocused] = useState(true);

  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://mern-stack-backend-xzo3.onrender.com/getProducts');
      setProducts(response.data.products || []);
      setFilteredProducts(response.data.products || []);
    } catch (error) {
      console.error("Error in fetching product list", error);
    }
  };

  const handleSearch = (searchText) => {
    setOnFocused(true);
    const normalizedSearchText = searchText.toLowerCase();
    setSearchText(normalizedSearchText);

    const filteredData = products.filter((product) =>
      product.name.toLowerCase().includes(normalizedSearchText)
    );
    setFilteredProducts(filteredData);

    const suggestedData = products.filter((product) =>
      product.name.toLowerCase().startsWith(normalizedSearchText)
    );
    setSuggestions(suggestedData.slice(0, 5));
  };

  const handleSuggestionClick = (productTitle) => {
    setSearchText(productTitle);
    handleSearch(productTitle);
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
      />

      <div className="suggestions">
        {focused &&
          suggestions.length > 0 &&
          suggestions.map((product, index) => (
            <div
              key={index}
              style={{ border: "1px solid grey" }}
              onClick={() => handleSuggestionClick(product.name)}
              onFocus={handleToggle}
              onBlur={handleToggleBlur}
              role="button"
            >
              {product.name}
            </div>
          ))}
      </div>

      <div className="cardWrapper">
        {filteredProducts.length === 0 ? (
          <h1>No Products found</h1>
        ) : (
          filteredProducts.map((product, index) => (
            <div key={index} className="mainCard">
              <Link to={`/product/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="product-info">
                  <img
                    src={product?.image[0]}
                    alt={product?.name}
                    style={imageSize}
                  />
                  <div className="product-details">
                    <h6>{product?.name}</h6>
                    <div className="price-row">
                      <h4>$ {product?.price}</h4>
                    </div>
                    <div className="product-description">
                      <span>{product?.description}</span>
                    </div>
                    {/* Add to Cart Button Moved Here */}
                    <button onClick={() => addToCart(product)} className="add-to-cart-btn">
                      Add to Cart
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCards;
