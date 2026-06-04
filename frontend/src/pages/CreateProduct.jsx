import { useState } from "react";
import api from "../services/api";

import { categories } from "../constants/categories";
import { conditions } from "../constants/conditions";

function CreateProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition_type: "",
    contact_method: "email",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      let imageUrl = null;

      if (image) {
        const uploadData = new FormData();

        uploadData.append("image", image);

        const uploadResponse = await api.post(
          "/upload",
          uploadData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        imageUrl = uploadResponse.data.imageUrl;
      }

      const productResponse = await api.post("/products", {
        ...formData,
        image_url: imageUrl,
      });

      console.log(productResponse.data);

      alert("Product Created Successfully!");

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        condition_type: "",
        contact_method: "email",
      });

      setImage(null);
    } catch (error) {
  console.error(error);

  console.log("FULL ERROR:");
  console.log(error);

  console.log("RESPONSE:");
  console.log(error.response?.data);

  alert(
    error.response?.data?.message ||
    error.message ||
    "Failed to create product"
  );
} finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Create Product</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
        />

        <br />
        <br />

        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
        />

        <br />
        <br />

        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
        >
          <option value="">Select Category</option>

          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        <br />
        <br />

        <select
          name="condition_type"
          value={formData.condition_type}
          onChange={handleChange}
        >
          <option value="">Select Condition</option>

          {conditions.map((condition) => (
            <option key={condition} value={condition}>
              {condition}
            </option>
          ))}
        </select>

        <br />
        <br />

        <select
          name="contact_method"
          value={formData.contact_method}
          onChange={handleChange}
        >
          <option value="email">Email</option>
          <option value="whatsapp">WhatsApp</option>
        </select>

        <br />
        <br />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            setImage(e.target.files[0]);
          }}
        />

        <br />
        <br />

        {image && (
          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            width="200"
          />
        )}

        <br />
        <br />

        <button type="submit" disabled={loading}>
          {loading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;