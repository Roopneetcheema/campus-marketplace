import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link
          to="/home"
          className="font-bold text-lg md:text-xl"
        >
          Campus Marketplace
        </Link>

        <div className="hidden md:flex items-center gap-3">
          <Link
            to="/home"
            className="hover:text-slate-600"
          >
            Home
          </Link>

          <Link
            to="/create-product"
            className="hover:text-slate-600"
          >
            Sell
          </Link>

          <Link
            to="/profile"
            className="hover:text-slate-600"
          >
            Profile
          </Link>

          <a
            href="http://localhost:5000/api/auth/logout"
            className="
              px-4
              py-2
              border
              rounded-xl
            "
          >
            Logout
          </a>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;