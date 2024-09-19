import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductCards.css";
import { Link } from "react-router-dom";
import { useFilter } from "./FilterContext"; // Import useFilter from the correct path

const ProductCards = () => {
  const imageSize = { width: "150px", height: "180px" };
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [focused, setOnFocused] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const { category } = useFilter(); // Access category from context

  useEffect(() => {
    fetchData();
    // Fetch cart items when component mounts
    const items = JSON.parse(localStorage.getItem('cart')) || [];
    setCartItems(items);
  }, []);

  useEffect(() => {
    filterProducts(); // Re-filter products when category or search text changes
  }, [category, searchText, products]);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://mern-stack-backend-xzo3.onrender.com/getProducts');
      console.log('response data', response.data);

      if (response.data && response.data.products) {
        setProducts(response.data.products);
        setFilteredProducts(response.data.products);
      } else {
        console.error('Response data mein products nahi hain');
      }
    } catch (error) {
      console.error("Product list fetch karne mein error", error);
    }
  };

  const filterProducts = () => {
    const normalizedSearchText = searchText.toLowerCase();
    const normalizedCategory = category?.toLowerCase(); // Normalize category value

    // Filter by category
    const categoryFilteredData = normalizedCategory === 'all' || !normalizedCategory
      ? products
      : products.filter((product) => product.category && product.category.toLowerCase() === normalizedCategory);

    // Filter by search text
    const searchFilteredData = categoryFilteredData.filter((product) =>
      product.name.toLowerCase().includes(normalizedSearchText)
    );

    setFilteredProducts(searchFilteredData);

    // Suggest products based on search text
    const suggestedData = categoryFilteredData.filter((product) =>
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

  const addToCart = (product, e) => {
    e.stopPropagation(); // Prevent click event from bubbling up to Link

    // Retrieve cart items from localStorage or initialize an empty array
    const currentCartItems = JSON.parse(localStorage.getItem('cart')) || [];

    // Check if the product already exists in the cart
    const productIndex = currentCartItems.findIndex(item => item._id === product._id);

    if (productIndex > -1) {
      // If product exists, increment quantity
      const updatedCartItems = currentCartItems.map((item, index) =>
        index === productIndex ? { ...item, quantity: item.quantity + 1 } : item
      );
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems);
      alert(`${product.name} quantity has been increased by 1!`);
    } else {
      // Add product to cart if it doesn't already exist with quantity 1
      const updatedCartItems = [...currentCartItems, { ...product, quantity: 1 }];
      localStorage.setItem('cart', JSON.stringify(updatedCartItems));
      setCartItems(updatedCartItems); // Update cartItems state
      alert(`${product.name} has been added to your cart!`);
    }
  };

  return (
    <div onClick={handleToggleBlur} style={{ textAlign: "center", position: "relative" }}>
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
              className="suggestion-item"
              onClick={() => handleSuggestionClick(product.name)}
              role="button"
            >
              {product.name}
            </div>
          ))}
      </div>

      <div className="cardWrapper">
        {filteredProducts.length === 0 ? (
          <h1>{searchText ? 'No Products found' : 'Loading...'}</h1>
        ) : (
          filteredProducts.map((product) => (
            <div key={product._id} className="mainCard">
              <Link to={`/product/${product._id}`} className="product-link">
                <img
                  src={product?.image[0]}
                  alt={product?.name}
                  style={imageSize}
                />
                <h6>{product?.name}</h6>
                <h4>$ {product?.price}</h4>
                <div>
                  <span>{product?.description}</span>
                </div>
              </Link>
              {/* Add to Cart Button */}
              <button
                onClick={(e) => addToCart(product, e)}
                className="add-to-cart-btn"
              >
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCards;
