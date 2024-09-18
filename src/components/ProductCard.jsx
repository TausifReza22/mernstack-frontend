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
  const { category } = useFilter(); // Access category from context

  useEffect(() => {
    fetchData();
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

    console.log('Category:', normalizedCategory); // Debugging category
    console.log('Search Text:', normalizedSearchText); // Debugging search text

    // Filter by category
    const categoryFilteredData = normalizedCategory === 'all' || !normalizedCategory
      ? products
      : products.filter((product) => product.category && product.category.toLowerCase() === normalizedCategory);

    console.log('categoryFilteredData', categoryFilteredData); // Debugging filtered data

    // Filter by search text
    const searchFilteredData = categoryFilteredData.filter((product) =>
      product.name.toLowerCase().includes(normalizedSearchText)
    );

    console.log('searchFilteredData', searchFilteredData); // Debugging filtered data

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
        {filteredProducts.length === 0 ? (
          <h1>{searchText ? 'No Products found' : 'Loading...'}</h1>
        ) : (
          filteredProducts.map((product) => (
            <Link
              key={product._id} // Use unique id here
              to={`/product/${product._id}`}
              className="mainCard"
            >
              <div>
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
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default ProductCards;
