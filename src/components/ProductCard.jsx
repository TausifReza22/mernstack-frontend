import { useEffect, useState } from "react";
import axios from "axios";
import "./ProductCards.css";
import { Link } from "react-router-dom";

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

  const fetchData = async () => {
    try {
      const response = await axios.get('https://mern-stack-backend-xzo3.onrender.com/getProducts');
      console.log('responce data', response.data);

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

    const filteredData = products.products.filter((product) =>
      product.name.toLowerCase().includes(normalizedSearchText)
    );
    setFilteredProducts(filteredData);

    const suggestedData = products.products.filter((product) =>
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

  return (
    <div onClick={handleToggleBlur} style={{ textAlign: "center" }}>
      {/* <input
        type="text"
        className="search-input"
        value={searchText}
        placeholder="Search Products...."
        onChange={(e) => handleSearch(e.target.value)}
      /> */}

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
