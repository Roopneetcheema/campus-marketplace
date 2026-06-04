import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

function Profile() {
  const [profile, setProfile] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
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
      }
    };

    fetchData();
  }, []);

  if (!profile) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border">
          <h1 className="text-2xl font-bold">
            {profile.user.name}
          </h1>

          <p className="text-slate-500 mt-1">
            {profile.user.email}
          </p>

          <div className="grid grid-cols-2 gap-4 mt-6">
            <div className="bg-slate-100 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Active Listings
              </p>

              <p className="text-2xl font-bold">
                {profile.activeListings}
              </p>
            </div>

            <div className="bg-slate-100 rounded-xl p-4">
              <p className="text-sm text-slate-500">
                Products Sold
              </p>

              <p className="text-2xl font-bold">
                {profile.soldProducts}
              </p>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-bold mt-8 mb-4">
          My Listings
        </h2>

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
      overflow-hidden
    "
  >
    {product.image_url && (
      <img
        src={product.image_url}
        alt={product.title}
        className="
          w-full
          aspect-square
          object-cover
        "
      />
    )}

    <div className="p-4">
      <h3 className="font-semibold">
        {product.title}
      </h3>

      <p className="text-emerald-600 font-bold mt-2">
        ₹{product.price}
      </p>

      <div className="mt-4 flex gap-2">
        <button
  onClick={async () => {
  const confirmed = window.confirm(
    "Mark this item as sold?"
  );

  if (!confirmed) return;

  try {
    await api.patch(
      `/products/${product.id}/sold`
    );

    const profileResponse =
      await api.get("/users/profile");

    const productsResponse =
      await api.get("/products/my");

    setProfile(profileResponse.data);
    setProducts(productsResponse.data.products);
  } catch (error) {
    console.error(error);
  }
}}
  className="
    flex-1
    bg-black
    text-white
    py-2
    rounded-xl
  "
>
  Mark Sold
</button>
      </div>
    </div>
  </div>
))}
        </div>
      </div>
    </div>
  );
}

export default Profile;