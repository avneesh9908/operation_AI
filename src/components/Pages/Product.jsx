import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Add this for history.push

const Product = () => {
  const [productName, setProductName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [rating, setRating] = useState("");
  const [photo, setPhoto] = useState("");
  const [quality, setQuality] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission

    const newProduct = { productName, price, rating, quantity, quality, photo };

    const existingProducts = JSON.parse(localStorage.getItem("products")) || [];

    existingProducts.push(newProduct);

    // Save the updated list back to localStorage
    localStorage.setItem("products", JSON.stringify(existingProducts));

    navigate("/");
  };
  const handleQualityChange = (e) => {
    setQuality(e.target.value);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhoto(reader.result); // Save the file data (base64 string) to the photo state
      };
      reader.readAsDataURL(file); // Read the file as a data URL
    }
  };

  return (
    <div className="product-container">
      <h2>Product Information</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="productName">Product Name</label>
          <input
            type="text"
            id="productName"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            placeholder="Enter product name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="productQuality">Select Quality</label>
          <select
            id="productQuality"
            value={quality}
            onChange={handleQualityChange}
          >
            <option value="">Select Quality</option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Standard">Standard</option>
            <option value="Bad">Bad</option>
            <option value="Very Poor">Very Poor</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="quantity">Quantity</label>
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="rating">Rating</label>
          <select
            id="rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            required
          >
            <option value="">Select Rating</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="photo">Upload Product Photo</label>
          <input
            type="file"
            id="photo"
            accept="image/*" // Restrict to image files only
            onChange={(e) => handlePhotoChange(e)}
            required
          />
        </div>

        <button type="submit" className="submit-button">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default Product;
