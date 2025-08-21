import { useState, useEffect } from "react";
import { useCopilotAction } from "@copilotkit/react-core"; // Import useCopilotAction hook
// import Chatbot from "./Chatbot";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import initialProducts from "../json/productData";
const Admin = () => {
  const [products, setProducts] = useState([]);
  const [editIndex, setEditIndex] = useState(null); // To track the row being edited
  const [editedProduct, setEditedProduct] = useState({
    productName: "",
    quality: "",
    rating: "",
    quantity: "",
    price: "",
    photo: "",
  });

  useEffect(() => {
    const storedProducts = JSON.parse(localStorage.getItem("products")) || [];
    // If no products in localStorage, use the initial JSON data
    if (storedProducts.length === 0) {
      localStorage.setItem("products", JSON.stringify(initialProducts));
      setProducts(initialProducts);
    } else {
      setProducts(storedProducts);
    }
  }, []);

  // Define Copilot action to add a new product
  useCopilotAction({
    name: "addProduct",
    description: "Add a new product to the list",
    parameters: [
      {
        name: "productName",
        type: "string",
        description: "The name of the product",
        required: true,
      },
      {
        name: "quality",
        type: "string",
        description: "The quality of the product",
        required: true,
      },
      {
        name: "rating",
        type: "string",
        description: "The rating of the product",
        required: true,
      },
      {
        name: "quantity",
        type: "string",
        description: "The quantity of the product",
        required: true,
      },
      {
        name: "price",
        type: "string",
        description: "The price of the product",
        required: true,
      },
      {
        name: "photo",
        type: "string",
        description: "The product photo URL",
        required: false,
      },
    ],
    handler: async ({
      productName,
      quality,
      rating,
      quantity,
      price,
      photo,
    }) => {
      const newProduct = {
        productName,
        quality,
        rating,
        quantity,
        price,
        photo,
      };
      const updatedProducts = [...products, newProduct];
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    },
  });

  const handleDelete = (index) => {
    const updatedItems = products.filter((item, i) => i !== index);
    setProducts(updatedItems);
    localStorage.setItem("products", JSON.stringify(updatedItems));
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setEditedProduct(products[index]);
  };

  const handleSave = () => {
    const updatedProducts = [...products];
    updatedProducts[editIndex] = editedProduct;
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
    setEditIndex(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0]; // Get the selected file
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setEditedProduct((prev) => ({
          ...prev,
          photo: reader.result, // Save base64 string for preview and storage
        }));
      };
      reader.readAsDataURL(file); // Convert file to base64 string
    }
  };

  const dispatch=useDispatch();
  const  handleAddToCart=(index)=>{
    const product= products[index];
    dispatch(addToCart(product));
  };

  return (
    <div>
      {/* <Chatbot /> */}
      <h1>Admin Panel</h1>

      <h2>All Products</h2>
      <table>
        <thead>
          <tr>
            <th>Product Name</th>
            <th>Product Quality</th>
            <th>Rating</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Photo</th>
            <th style={{ paddingLeft:'85px'}}>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product, index) => (
              <tr key={index}>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="productName"
                      value={editedProduct.productName}
                      onChange={handleChange}
                    />
                  ) : (
                    product.productName
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <select
                      id="quality"
                      name="quality"
                      value={editedProduct.quality}
                      onChange={handleChange}
                    >
                      <option value="">Select Quality</option>
                      <option value="Excellent">Excellent</option>
                      <option value="Good">Good</option>
                      <option value="Standard">Standard</option>
                      <option value="Bad">Bad</option>
                      <option value="Very Poor">Very Poor</option>
                    </select>
                  ) : (
                    product.quality
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <select
                      id="rating"
                      name="rating"
                      value={editedProduct.rating}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Rating</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  ) : (
                    product.rating
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="quantity"
                      value={editedProduct.quantity}
                      onChange={handleChange}
                    />
                  ) : (
                    product.quantity
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <input
                      type="text"
                      name="price"
                      value={editedProduct.price}
                      onChange={handleChange}
                    />
                  ) : (
                    product.price
                  )}
                </td>
                <td>
                  {editIndex === index ? (
                    <div>
                      <input
                        type="file"
                        id="photo"
                        accept="image/*"
                        onChange={(e) => handlePhotoChange(e)}
                      />
                      {editedProduct.photo && (
                        <div className="photo-preview">
                          <img
                            src={editedProduct.photo}
                            alt="Preview"
                            style={{
                              width: "50px",
                              height: "50px",
                              marginTop: "10px",
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ) : (
                    <img
                      src={product.photo}
                      alt={product.productName}
                      width="50"
                    />
                  )}
                </td>

                <td>
                  {editIndex === index ? (
                    <button className="save-btn" onClick={handleSave}>
                      Save
                    </button>
                  ) : (
                    <>
                      <button
                        className="edit-btn"
                        onClick={() => handleEdit(index)}
                      >
                        Edit
                      </button>
                      <button
                        className="delete-btn"
                        onClick={() => handleDelete(index)}
                      >
                        Delete
                      </button>
                      <button
                        className="cart-btn"
                        onClick={() => handleAddToCart(index)}
                      >
                        Add to Cart
                      </button>
                    </>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" style={{ textAlign: "center" }}>
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
