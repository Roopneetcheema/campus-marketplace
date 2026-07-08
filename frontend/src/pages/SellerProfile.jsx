import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import toast from "react-hot-toast";

import api from "../services/api";
import ProductCard from "../components/ProductCard";

function SellerProfile() {
  const { id } = useParams();

  const [seller, setSeller] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchSeller = async () => {
      try {
        const response = await api.get(
          `/users/${id}`
        );

        setSeller(response.data);
        setProducts(response.data.products);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeller();
  }, [id]);

  if (!seller) {
    return (
      <div className="min-h-screen bg-[#f6f5f3] flex items-center justify-center">
        <h2 className="text-lg font-medium">
          Loading seller...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f6f5f3] pb-24">
      <div className="max-w-6xl mx-auto px-4 py-6">

        {/* Back */}
        <Link
          to={-1}
          onClick={(e) => {
            e.preventDefault();
            window.history.back();
          }}
          className="text-slate-500 text-sm"
        >
          ← Back
        </Link>

        {/* Seller Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 mt-4">

          <div className="flex items-center gap-4">

            <div
              className="
                h-16
                w-16
                rounded-full
                bg-slate-800
                text-white
                flex
                items-center
                justify-center
                text-2xl
                font-bold
              "
            >
              {seller.user.name.charAt(0)}
            </div>

            <div>
              <h1 className="text-2xl font-bold">
                {seller.user.name}
              </h1>

              <p className="text-slate-500">
                {seller.user.email}
              </p>
            </div>

          </div>

          <div className="grid grid-cols-2 gap-4 mt-8">

            <div className="bg-slate-100 rounded-2xl p-5">
              <p className="text-sm text-slate-500">
                Active Listings
              </p>

              <p className="text-3xl font-bold mt-1">
                {seller.activeListings}
              </p>
            </div>

            <div className="bg-slate-100 rounded-2xl p-5">
              <p className="text-sm text-slate-500">
                Products Sold
              </p>

              <p className="text-3xl font-bold mt-1">
                {seller.soldProducts}
              </p>
            </div>

          </div>

          <div className="mt-8">

            <h2 className="text-lg font-semibold">
              Contact Seller
            </h2>

            <button
  onClick={() => {
    navigator.clipboard.writeText(seller.user.email);
    toast.success("Email copied to clipboard!");
  }}
  className="
    mt-4
    block
    w-full
    bg-slate-900
    text-white
    py-3
    rounded-2xl
    font-medium
  "
>
  Copy Email
</button>

          </div>

        </div>

        {/* Listings */}

        <div className="flex items-center justify-between mt-10 mb-5">

          <h2 className="text-2xl font-bold">
            Listings
          </h2>

          <span className="text-slate-500">
            {products.length} items
          </span>

        </div>

        {products.length === 0 ? (

          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">

            <h3 className="text-lg font-semibold">
              No active listings
            </h3>

            <p className="text-slate-500 mt-2">
              This seller currently has no products listed.
            </p>

          </div>

        ) : (

          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-5
            "
          >
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>

        )}

      </div>
    </div>
  );
}

export default SellerProfile;