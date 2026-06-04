import { useEffect, useState } from "react";
import api from "../services/api";
import ProductCard from "../components/ProductCard";

import { categories } from "../constants/categories";
import { hostels } from "../constants/hostels";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedCategory, setSelectedCategory] =
    useState("All");

  const [selectedHostel, setSelectedHostel] =
    useState("All");

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

  const filteredProducts = products.filter(
    (product) => {
      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesCategory =
        selectedCategory === "All" ||
        product.category === selectedCategory;

      const matchesHostel =
        selectedHostel === "All" ||
        product.hostel === selectedHostel;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesHostel
      );
    }
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-50">
        <h1 className="text-xl font-semibold text-slate-700">
          Loading products...
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 py-6">

        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
            Find What You Need
          </h1>

          <p className="text-slate-500 mt-2">
            Buy and sell within the campus community.
          </p>
        </div>

        {/* Search */}
        <div className="mb-6">
          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            placeholder="Search books, cycles, electronics..."
            className="
              w-full
              bg-white
              border
              border-slate-300
              rounded-2xl
              p-4
              focus:outline-none
              focus:ring-2
              focus:ring-slate-400
            "
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <div
            className="
              flex
              gap-2
              overflow-x-auto
              pb-2
            "
          >
            <button
              onClick={() =>
                setSelectedCategory("All")
              }
              className={`
                whitespace-nowrap
                px-4
                py-2
                rounded-full
                text-sm
                ${
                  selectedCategory === "All"
                    ? "bg-black text-white"
                    : "bg-white border border-slate-300"
                }
              `}
            >
              All
            </button>

            {categories.map((category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(category)
                }
                className={`
                  whitespace-nowrap
                  px-4
                  py-2
                  rounded-full
                  text-sm
                  ${
                    selectedCategory === category
                      ? "bg-black text-white"
                      : "bg-white border border-slate-300"
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Hostel Filter */}
        <div className="mb-8">
          <select
            value={selectedHostel}
            onChange={(e) =>
              setSelectedHostel(e.target.value)
            }
            className="
              w-full
              md:w-72
              bg-white
              border
              border-slate-300
              rounded-2xl
              p-3
              focus:outline-none
              focus:ring-2
              focus:ring-slate-400
            "
          >
            <option value="All">
              All Hostels
            </option>

            {hostels.map((hostel) => (
              <option
                key={hostel}
                value={hostel}
              >
                {hostel}
              </option>
            ))}
          </select>
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="text-center mt-20">
            <h2 className="text-lg text-slate-500">
              No matching products found
            </h2>
          </div>
        ) : (
          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-3
              lg:grid-cols-4
              xl:grid-cols-5
              gap-4
            "
          >
            {filteredProducts.map((product) => (
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

export default Home;