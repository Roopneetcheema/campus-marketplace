import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await api.get("/products");

      setProducts(response.data.products);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) {
    return <h2>Loading...</h2>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1>Campus Marketplace</h1>

      <Link to="/create-product">
        <button>Create Product</button>
      </Link>

      <hr />

      {products.length === 0 ? (
        <p>No products found</p>
      ) : (
        products.map((product) => (
          <Link
            key={product.id}
            to={`/product/${product.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: "1px solid #ccc",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              <h3>{product.title}</h3>

              <p>{product.description}</p>

              <p>
                <strong>Price:</strong> ₹{product.price}
              </p>

              <p>
                <strong>Category:</strong> {product.category}
              </p>

              <p>
                <strong>Condition:</strong> {product.condition_type}
              </p>

              <p>
                <strong>Seller:</strong> {product.seller_name}
              </p>

              <p>
                <strong>Status:</strong> {product.status}
              </p>
            </div>
          </Link>
        ))
      )}
    </div>

  );
}

export default Home;