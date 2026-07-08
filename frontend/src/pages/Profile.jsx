import { useEffect, useState } from "react";
import toast from "react-hot-toast";

import api from "../services/api";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] =
  useState(null);

const [showConfirmModal, setShowConfirmModal] =
  useState(false);

  const fetchData = async () => {
    try {
      const profileResponse =
        await api.get("/users/profile");

      const productsResponse =
        await api.get("/products/my");

      setProfile(profileResponse.data);
      setProducts(productsResponse.data.products);
    } catch (error) {
      console.error(error);

      toast.error(
        "Failed to load profile"
      );
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

const handleMarkSold = (product) => {
  setSelectedProduct(product);
  setShowConfirmModal(true);
};

const confirmMarkSold = async () => {
  try {
    await api.patch(
      `/products/${selectedProduct.id}/sold`
    );

    await fetchData();

    toast.success(
      "Product marked as sold!"
    );

    setShowConfirmModal(false);
    setSelectedProduct(null);
  } catch (error) {
    console.error(error);

    toast.error(
      "Failed to mark product as sold"
    );
  }
};
  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
          <h1 className="text-2xl font-bold">
            {profile.user.name}
          </h1>

          <p className="text-slate-500 mt-1">
            {profile.user.email}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-100 rounded-2xl p-4">
              <p className="text-sm text-slate-500">
                Active Listings
              </p>

              <p className="text-3xl font-bold mt-1">
                {profile.activeListings}
              </p>
            </div>

            <div className="bg-slate-100 rounded-2xl p-4">
              <p className="text-sm text-slate-500">
                Products Sold
              </p>

              <p className="text-3xl font-bold mt-1">
                {profile.soldProducts}
              </p>
            </div>
          </div>
        </div>

        {/* Listings */}
        <div className="flex items-center justify-between mt-8 mb-4">
          <h2 className="text-xl font-bold">
            My Listings
          </h2>

          <span className="text-slate-500 text-sm">
            {products.length} active
          </span>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-3xl p-10 text-center border border-slate-200">
            <h3 className="font-semibold text-lg">
              No active listings
            </h3>

            <p className="text-slate-500 mt-2">
              Create a product listing to
              start selling.
            </p>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              gap-4
            "
          >
            {products.map((product) => (
              <div
                key={product.id}
                className="
                  bg-white
                  rounded-2xl
                  border
                  border-slate-200
                  overflow-hidden
                "
              >
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.title}
                    className="
                      w-full
                      aspect-square
                      object-cover
                    "
                  />
                ) : (
                  <div
                    className="
                      aspect-square
                      bg-slate-100
                      flex
                      items-center
                      justify-center
                      text-slate-400
                    "
                  >
                    No Image
                  </div>
                )}

                <div className="p-4">
                  <h3 className="font-semibold line-clamp-2">
                    {product.title}
                  </h3>

                  <p
                    className="
                      text-emerald-600
                      font-bold
                      text-lg
                      mt-2
                    "
                  >
                    ₹{product.price}
                  </p>

                  <div
                    className="
                      mt-2
                      text-xs
                      text-slate-500
                    "
                  >
                    Hostel  {product.hostel}
                  </div>

                  <button
                    onClick={() =>
                      handleMarkSold(product)
                    }
                    className="
                      w-full
                      mt-4
                      bg-black
                      text-white
                      py-2
                      rounded-xl
                      hover:bg-slate-800
                      transition
                    "
                  >
                    Mark Sold
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {showConfirmModal && (
  <div
    className="
      fixed
      inset-0
      bg-black/50
      flex
      items-center
      justify-center
      z-50
      px-4
    "
  >
    <div
      className="
        bg-white
        rounded-3xl
        p-6
        w-full
        max-w-sm
        shadow-xl
      "
    >
      <h2 className="text-xl font-bold">
        Mark as Sold?
      </h2>

      <p className="text-slate-500 mt-3">
        "{selectedProduct?.title}"
        will be removed from active listings.
      </p>

      <div className="flex gap-3 mt-6">
        <button
          onClick={() => {
            setShowConfirmModal(false);
            setSelectedProduct(null);
          }}
          className="
            flex-1
            border
            border-slate-300
            py-3
            rounded-xl
          "
        >
          Cancel
        </button>

        <button
          onClick={confirmMarkSold}
          className="
            flex-1
            bg-black
            text-white
            py-3
            rounded-xl
          "
        >
          Mark Sold
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
}

export default Profile;