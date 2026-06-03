import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);

        setProduct(response.data.product);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <h2>Loading...</h2>;
  }

  return (
    <div>
      <h1>{product.title}</h1>

      <hr />

      <p>
        <strong>Description:</strong> {product.description}
      </p>

      <p>
        <strong>Price:</strong> ₹{product.price}
      </p>

      <p>
        <strong>Category:</strong> {product.category}
      </p>

      <p>
        <strong>Condition:</strong> {product.condition_type}
      </p>

      <hr />

      <h2>Seller Information</h2>

      <p>
        <strong>Name:</strong> {product.name}
      </p>

      {product.contact_method === "email" ? (
        <p>
          <strong>Email:</strong> {product.email}
        </p>
      ) : (
        <p>
          <strong>WhatsApp:</strong> {product.phone}
        </p>
      )}
    </div>
  );
}

export default ProductDetails;