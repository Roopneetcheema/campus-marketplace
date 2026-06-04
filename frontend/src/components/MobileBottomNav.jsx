import { Link, useLocation } from "react-router-dom";

function MobileBottomNav() {
  const location = useLocation();

  const isActive = (path) =>
    location.pathname === path;

  return (
    <div
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
      <div className="grid grid-cols-3 h-16">
        <Link
          to="/home"
          className={`
            flex
            flex-col
            items-center
            justify-center
            text-sm
            ${
              isActive("/home")
                ? "font-semibold"
                : "text-slate-500"
            }
          `}
        >
          
          <span>Home</span>
        </Link>

        <Link
          to="/create-product"
          className={`
            flex
            flex-col
            items-center
            justify-center
            text-sm
            ${
              isActive("/create-product")
                ? "font-semibold"
                : "text-slate-500"
            }
          `}
        >
          
          <span>Sell</span>
        </Link>

        <Link
          to="/profile"
          className={`
            flex
            flex-col
            items-center
            justify-center
            text-sm
            ${
              isActive("/profile")
                ? "font-semibold"
                : "text-slate-500"
            }
          `}
        >
          
          <span>Profile</span>
        </Link>
      </div>
    </div>
  );
}

export default MobileBottomNav;