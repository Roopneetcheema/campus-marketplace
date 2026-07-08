import { useState } from "react";
import { useNavigate } from "react-router-dom";

import toast from "react-hot-toast";

import api from "../services/api";

import { categories } from "../constants/categories";
import { conditions } from "../constants/conditions";
import { hostels } from "../constants/hostels";

function CreateProduct() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    condition_type: "",
    hostel: "",
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
      let publicId = null;

      if (image) {
        const uploadData = new FormData();

        uploadData.append("image", image);

        const uploadResponse = await api.post(
          "/upload",
          uploadData,
          {
            headers: {
              "Content-Type":
                "multipart/form-data",
            },
          }
        );

        imageUrl =
  uploadResponse.data.imageUrl;

publicId =
  uploadResponse.data.publicId;
      }

     await api.post("/products", {
  ...formData,
  image_url: imageUrl,
  public_id: publicId,
});;

      toast.success(
        "Product listed successfully!"
      );

      setFormData({
        title: "",
        description: "",
        price: "",
        category: "",
        condition_type: "",
        hostel: "",
        contact_method: "email",
      });

      setImage(null);

      setTimeout(() => {
        navigate("/profile");
      }, 1200);
    } catch (error) {
      console.error(error);

      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 py-6">
        

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >
            <div>
              <label className="block text-sm font-medium mb-2">
                Product Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="..."
                className="
                  w-full
                  p-3
                  border
                  border-slate-300
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-slate-400
                "
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Description
              </label>

              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your item..."
                className="
                  w-full
                  p-3
                  border
                  border-slate-300
                  rounded-xl
                  focus:outline-none
                  focus:ring-2
                  focus:ring-slate-400
                "
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="..."
                  className="
                    w-full
                    p-3
                    border
                    border-slate-300
                    rounded-xl
                  "
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Hostel
                </label>

                <select
                  name="hostel"
                  value={formData.hostel}
                  onChange={handleChange}
                  className="
                    w-full
                    p-3
                    border
                    border-slate-300
                    rounded-xl
                  "
                >
                  <option value="">
                    Select Hostel
                  </option>

                  {hostels.map((hostel) => (
                    <option
                      key={hostel}
                      value={hostel}
                    >
                      {hostel}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Category
                </label>

                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="
                    w-full
                    p-3
                    border
                    border-slate-300
                    rounded-xl
                  "
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map(
                    (category) => (
                      <option
                        key={category}
                        value={category}
                      >
                        {category}
                      </option>
                    )
                  )}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Condition
                </label>

                <select
                  name="condition_type"
                  value={
                    formData.condition_type
                  }
                  onChange={handleChange}
                  className="
                    w-full
                    p-3
                    border
                    border-slate-300
                    rounded-xl
                  "
                >
                  <option value="">
                    Select Condition
                  </option>

                  {conditions.map(
                    (condition) => (
                      <option
                        key={condition}
                        value={condition}
                      >
                        {condition}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Contact Method
              </label>

              <select
                name="contact_method"
                value={
                  formData.contact_method
                }
                onChange={handleChange}
                className="
                  w-full
                  p-3
                  border
                  border-slate-300
                  rounded-xl
                "
              >
                <option value="email">
                  Email
                </option>

                <option value="whatsapp">
                  WhatsApp
                </option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setImage(
                    e.target.files[0]
                  )
                }
                className="
                  w-full
                  p-3
                  border
                  border-slate-300
                  rounded-xl
                  bg-white
                "
              />
            </div>

            {image && (
              <img
                src={URL.createObjectURL(
                  image
                )}
                alt="preview"
                className="
                  w-full
                  max-h-72
                  object-cover
                  rounded-2xl
                  border
                "
              />
            )}

            <button
              type="submit"
              disabled={loading}
              className="
                w-full
                bg-black
                text-white
                py-4
                rounded-2xl
                font-medium
                hover:bg-slate-800
                transition
                disabled:opacity-50
              "
            >
              {loading
                ? "Creating..."
                : "Create Listing"}
            </button>
          </form>
        </div>
      </div>
    
  );
}

export default CreateProduct;