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

  const [showHostelModal, setShowHostelModal] =
    useState(false);

  const [sortBy, setSortBy] =
    useState("newest");

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response =
        await api.get("/products");

      setProducts(
        response.data.products
      );
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products
    .filter((product) => {
      const matchesSearch =
        product.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const matchesCategory =
        selectedCategory === "All" ||
        product.category ===
          selectedCategory;

      const matchesHostel =
        selectedHostel === "All" ||
        product.hostel ===
          selectedHostel;

      return (
        matchesSearch &&
        matchesCategory &&
        matchesHostel
      );
    })
    .sort((a, b) => {
      if (sortBy === "lowToHigh") {
        return (
          Number(a.price) -
          Number(b.price)
        );
      }

      if (sortBy === "highToLow") {
        return (
          Number(b.price) -
          Number(a.price)
        );
      }

      return (
        new Date(b.created_at) -
        new Date(a.created_at)
      );
    });

  if (loading) {
    return (
      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-[#f6f5f3]
        "
      >
        <h1 className="text-slate-600">
          Loading...
        </h1>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#f6f5f3]
        pb-24
      "
    >
      <div
        className="
          max-w-7xl
          mx-auto
          px-4
          py-5
        "
      >
        {/* Search */}
        <div className="mb-4">
          <input
            type="text"
            value={search}
            onChange={(e) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search books, cycles, electronics..."
            className="
              w-full
              h-12
              bg-white
              border
              border-slate-200
              rounded-2xl
              px-4
              text-sm
              focus:outline-none
            "
          />
        </div>

        {/* Categories */}
        <div
          className="
            flex
            gap-2
            overflow-x-auto
            pb-2
            mb-4
          "
        >
          <button
            onClick={() =>
              setSelectedCategory(
                "All"
              )
            }
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs ${
              selectedCategory ===
              "All"
                ? "bg-slate-800 text-white"
                : "bg-white border border-slate-200"
            }`}
          >
            All
          </button>

          {categories.map(
            (category) => (
              <button
                key={category}
                onClick={() =>
                  setSelectedCategory(
                    category
                  )
                }
                className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs ${
                  selectedCategory ===
                  category
                    ? "bg-slate-800 text-white"
                    : "bg-white border border-slate-200"
                }`}
              >
                {category}
              </button>
            )
          )}
        </div>

        {/* Filters */}
        <div
          className="
            flex
            items-center
            justify-between
            mb-5
            gap-2
          "
        >
          <p className="text-sm text-slate-500">
            {
              filteredProducts.length
            }{" "}
            items
          </p>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setShowHostelModal(
                  true
                )
              }
              className="
                bg-white
                border
                border-slate-200
                rounded-xl
                px-3
                py-2
                text-sm
              "
            >
              {selectedHostel ===
              "All"
                ? "Hostel"
                : selectedHostel}
            </button>

            <select
              value={sortBy}
              onChange={(e) =>
                setSortBy(
                  e.target.value
                )
              }
              className="
                bg-white
                border
                border-slate-200
                rounded-xl
                px-3
                py-2
                text-sm
              "
            >
              <option value="newest">
                Newest
              </option>

              <option value="lowToHigh">
                Price ↑
              </option>

              <option value="highToLow">
                Price ↓
              </option>
            </select>
          </div>
        </div>

        {/* Products */}
        {filteredProducts.length ===
        0 ? (
          <div className="py-20 text-center">
            <h2 className="font-semibold">
              Nothing found
            </h2>

            <p className="text-slate-500 mt-2">
              Try another search.
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
            {filteredProducts.map(
              (product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                />
              )
            )}
          </div>
        )}
      </div>

      {/* Hostel Modal */}
      {showHostelModal && (
        <div
          className="
            fixed
            inset-0
            bg-black/40
            z-50
            flex
            items-end
          "
          onClick={() =>
            setShowHostelModal(false)
          }
        >
          <div
            className="
              bg-white
              w-full
              rounded-t-3xl
              p-5
              max-h-[70vh]
              overflow-y-auto
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >
            <div className="w-12 h-1 bg-slate-300 rounded-full mx-auto mb-5" />

            <h2 className="font-semibold text-lg mb-4">
              Select Hostel
            </h2>

            <button
              onClick={() => {
                setSelectedHostel(
                  "All"
                );
                setShowHostelModal(
                  false
                );
              }}
              className="
                w-full
                text-left
                py-3
                border-b
              "
            >
              All Hostels
            </button>

            {hostels.map(
              (hostel) => (
                <button
                  key={hostel}
                  onClick={() => {
                    setSelectedHostel(
                      hostel
                    );
                    setShowHostelModal(
                      false
                    );
                  }}
                  className="
                    w-full
                    text-left
                    py-3
                    border-b
                  "
                >
                  Hostel {hostel}
                </button>
              )
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;