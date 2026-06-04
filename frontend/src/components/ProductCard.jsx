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
          border-slate-200
          hover:shadow-lg
          transition-all
          duration-200
        "
      >
        {/* Image */}
        <div className="aspect-square bg-slate-100">
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
            <div className="h-full flex items-center justify-center text-slate-400">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3">
          <h3
            className="
              font-semibold
              text-slate-900
              text-sm
              md:text-base
              line-clamp-2
              min-h-[40px]
            "
          >
            {product.title}
          </h3>

          <p
            className="
              text-lg
              md:text-xl
              font-bold
              text-emerald-600
              mt-2
            "
          >
            ₹{product.price}
          </p>

          <div className="flex gap-2 mt-2 flex-wrap">
            <span
              className="
                text-xs
                bg-slate-100
                px-2
                py-1
                rounded-full
              "
            >
              {product.category}
            </span>

            <span
              className="
                text-xs
                bg-slate-100
                px-2
                py-1
                rounded-full
              "
            >
              {product.condition_type}
            </span>
          </div>

          <div
            className="
              mt-3
              text-xs
              text-slate-500
              flex
              items-center
              gap-1
            "
          >
            Hostel {product.hostel}
          </div>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;