import { useState } from "react";
import api from "../services/api";

function CreateProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition_type: "",
    contact_method: "email",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post("/products", formData);

      alert("Product Created!");

      console.log(response.data);

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        condition_type: "",
        contact_method: "email",
      });
    } catch (error) {
      console.error(error);

      alert("Failed to create product");
    }
  };

  return (
    <div>
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

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
        />

        <br />
        <br />

        <input
          type="text"
          name="condition_type"
          placeholder="Condition"
          value={formData.condition_type}
          onChange={handleChange}
        />

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

        <button type="submit">
          Create Product
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;