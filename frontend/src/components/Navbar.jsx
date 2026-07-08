import { Link } from "react-router-dom";
import {
  House,
  PlusSquare,
  User,
  LogOut,
} from "lucide-react";

function Navbar() {
  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden md:block bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            to="/home"
            className="font-black text-xl text-slate-800"
          >
            RoRo
          </Link>

          <div className="flex items-center gap-4">
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

      {/* Mobile Bottom Nav */}
      <nav
        className="
          md:hidden
          fixed
          bottom-0
          left-0
          right-0
          bg-white
          border-t
          border-slate-200
          z-50
        "
      >
        <div className="grid grid-cols-4 h-16">
          <Link
            to="/home"
            className="
              flex
              items-center
              justify-center
            "
          >
            <House size={22} />
          </Link>

          <Link
            to="/create-product"
            className="
              flex
              items-center
              justify-center
            "
          >
            <PlusSquare size={22} />
          </Link>

          <Link
            to="/profile"
            className="
              flex
              items-center
              justify-center
            "
          >
            <User size={22} />
          </Link>

          <a
            href="http://localhost:5000/api/auth/logout"
            className="
              flex
              items-center
              justify-center
            "
          >
            <LogOut size={22} />
          </a>
        </div>
      </nav>
    </>
  );
}

export default Navbar;