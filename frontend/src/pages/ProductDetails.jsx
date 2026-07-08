import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

import api from "../services/api";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] =
    useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response =
          await api.get(
            `/products/${id}`
          );

        setProduct(
          response.data.product
        );
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [id]);
  
  if (!product) {
    return (
      <div
        className="
          min-h-screen
          bg-[#f6f5f3]
          flex
          items-center
          justify-center
        "
      >
        <h2
          className="
            text-xl
            font-semibold
            text-slate-700
          "
        >
          Loading Product...
        </h2>
      </div>
    );
  }

  return (
    <div
      className="
        min-h-screen
        bg-[#f6f5f3]
        pb-28
      "
    >
      <div
        className="
          max-w-6xl
          mx-auto
          px-4
          py-6
        "
      >
        <div
          className="
            grid
            grid-cols-1
            lg:grid-cols-2
            gap-8
          "
        >
          {/* Image */}
          <div className="lg:sticky lg:top-24 h-fit">
            {product.images?.length >
            0 ? (
              <img
                src={
                  product.images[0]
                    .image_url
                }
                alt={
                  product.title
                }
                className="
                  w-full
                  rounded-3xl
                  object-cover
                  border
                  border-slate-200
                "
              />
            ) : (
              <div
                className="
                  aspect-square
                  bg-slate-200
                  rounded-3xl
                  flex
                  items-center
                  justify-center
                "
              >
                No Image
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <div
              className="
                bg-white
                rounded-3xl
                p-6
                border
                border-slate-200
              "
            >
              {/* Price */}
              <p
                className="
                  text-4xl
                  font-black
                  text-slate-900
                "
              >
                ₹{product.price}
              </p>

              {/* Title */}
              <h1
                className="
                  text-3xl
                  font-bold
                  mt-3
                "
              >
                {product.title}
              </h1>

              {/* Badges */}
              <div
                className="
                  flex
                  gap-2
                  flex-wrap
                  mt-5
                "
              >
               
               

                <span
                  className="
                    px-3
                    py-1.5
                    bg-amber-50
                    text-amber-700
                    rounded-full
                    text-sm
                    font-medium
                  "
                >
                  Hostel{" "}
                  {
                    product.hostel
                  }
                </span>
              </div>

              {/* Quick Info */}
              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                  mt-6
                "
              >
                <div
                  className="
                    bg-slate-50
                    rounded-2xl
                    p-3
                  "
                >
                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    Category
                  </p>

                  <p
                    className="
                      font-medium
                      mt-1
                    "
                  >
                    {
                      product.category
                    }
                  </p>
                </div>

                <div
                  className="
                    bg-slate-50
                    rounded-2xl
                    p-3
                  "
                >
                  <p
                    className="
                      text-xs
                      text-slate-500
                    "
                  >
                    Condition
                  </p>

                  <p
                    className="
                      font-medium
                      mt-1
                    "
                  >
                    {
                      product.condition_type
                    }
                  </p>
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <h2
                  className="
                    text-lg
                    font-semibold
                  "
                >
                  Description
                </h2>

                <p
                  className="
                    mt-3
                    text-slate-600
                    leading-relaxed
                  "
                >
                  {
                    product.description
                  }
                </p>
              </div>
            </div>

           {/* Seller Card */}
<div
  className="
    bg-white
    rounded-3xl
    p-6
    border
    border-slate-200
    mt-6
  "
>
  <p className="text-sm text-slate-500">
    Seller
  </p>

  <div className="flex items-center gap-4 mt-4">
    <div
      className="
        h-14
        w-14
        rounded-full
        bg-slate-900
        text-white
        flex
        items-center
        justify-center
        text-xl
        font-bold
      "
    >
      {product.name.charAt(0)}
    </div>

    <div>
      <h2 className="text-xl font-bold">
        {product.name}
      </h2>

      <p className="text-sm text-slate-500">
        Trusted Thapar Student
      </p>
    </div>
  </div>

  <Link
    to={`/seller/${product.seller_id}`}
    className="
      mt-6
      block
      w-full
      text-center
      bg-slate-900
      text-white
      py-3
      rounded-2xl
      font-medium
      hover:bg-slate-800
      transition
    "
  >
    View Seller Profile →
  </Link>
</div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default ProductDetails;