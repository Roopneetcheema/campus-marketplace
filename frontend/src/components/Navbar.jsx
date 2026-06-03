import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav
      style={{
        display: "flex",
        gap: "20px",
        padding: "15px",
        borderBottom: "1px solid #ccc",
      }}
    >
      <Link to="/home">Home</Link>

      <Link to="/create-product">Create Product</Link>

      <a href="http://localhost:5000/api/auth/logout">
        Logout
      </a>
    </nav>
  );
}

export default Navbar;