import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <Link
      to={`/product/${product.id}`}
      className="block"
    >
      <div
        className="
          bg-white
          rounded-2xl
          overflow-hidden
          border
          border-slate-100
          hover:shadow-md
          transition-all
          duration-200
        "
      >
        {/* Image */}
        <div className="relative aspect-[4/5] bg-slate-100">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.title}
              className="
                w-full
                h-full
                object-cover
              "
            />
          ) : (
            <div
              className="
                h-full
                flex
                items-center
                justify-center
                text-slate-400
                text-sm
              "
            >
              No Image
            </div>
          )}

          <span
            className="
              absolute
              top-2
              left-2
              bg-white/90
              backdrop-blur
              text-[10px]
              px-2
              py-1
              rounded-full
              font-medium
              text-slate-700
            "
          >
            {product.category}
          </span>
        </div>

        {/* Content */}
        <div className="p-3">
          <h3
            className="
              text-sm
              font-medium
              text-slate-900
              truncate
            "
          >
            {product.title}
          </h3>

          <p
            className="
              mt-2
              text-lg
              font-bold
              text-slate-900
            "
          >
            ₹{product.price}
          </p>

          <div className="mt-2 flex items-center justify-between">
            <span
              className="
                text-[11px]
                text-slate-500
              "
            >
              Hostel {product.hostel}
            </span>

            <span
              className="
                text-[11px]
                text-slate-400
              "
            >
              {product.condition_type}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;