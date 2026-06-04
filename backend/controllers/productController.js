const pool = require("../config/db");

const createProduct = async (req, res) => {
  try {
    const {
  title,
  description,
  price,
  category,
  condition_type,
  contact_method,
  hostel,
  image_url,
} = req.body;

    if (
  !title ||
  !description ||
  !price ||
  !category ||
  !condition_type ||
  !contact_method ||
  !hostel
){
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const seller_id = req.user.id;

    const productResult = await pool.query(
      `
      INSERT INTO products
      (
        title,
description,
price,
category,
condition_type,
contact_method,
hostel,
seller_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8)
      RETURNING *
      `,
      [
  title,
  description,
  price,
  category,
  condition_type,
  contact_method,
  hostel,
  seller_id,
]
    );

    const product = productResult.rows[0];

    if (image_url) {
      await pool.query(
        `
        INSERT INTO product_images
        (
          product_id,
          image_url
        )
        VALUES ($1,$2)
        `,
        [product.id, image_url]
      );
    }

    res.status(201).json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to create product",
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT
  products.*,
  users.name AS seller_name,
  (
    SELECT image_url
    FROM product_images
    WHERE product_images.product_id = products.id
    LIMIT 1
  ) AS image_url
FROM products
JOIN users
ON products.seller_id = users.id
WHERE products.status = 'available'
ORDER BY products.created_at DESC
    `);

    res.json({
      success: true,
      products: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch products",
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const productResult = await pool.query(
      `
      SELECT
        products.*,
        users.name,
        users.email,
        users.phone,
        users.preferred_contact_method
      FROM products
      JOIN users
      ON products.seller_id = users.id
      WHERE products.id = $1
      `,
      [id]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const imagesResult = await pool.query(
      `
      SELECT image_url
      FROM product_images
      WHERE product_id = $1
      `,
      [id]
    );

    const product = productResult.rows[0];

    product.images = imagesResult.rows;

    res.json({
      success: true,
      product,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};
const getMyProducts = async (req, res) => {
  try {
    const seller_id = req.user.id;

    const result = await pool.query(
      `
      SELECT
        products.*,
        (
          SELECT image_url
          FROM product_images
          WHERE product_images.product_id = products.id
          LIMIT 1
        ) AS image_url
      FROM products
      WHERE seller_id = $1
      AND status = 'available'
      ORDER BY created_at DESC
      `,
      [seller_id]
    );

    res.json({
      success: true,
      products: result.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch your products",
    });
  }
};

const markProductSold = async (req, res) => {
  try {
    const { id } = req.params;

    const productResult = await pool.query(
      `
      SELECT *
      FROM products
      WHERE id = $1
      `,
      [id]
    );

    if (productResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    const product = productResult.rows[0];

    if (product.seller_id !== req.user.id) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized",
      });
    }

    await pool.query(
      `
      UPDATE products
      SET status = 'sold'
      WHERE id = $1
      `,
      [id]
    );

    res.json({
      success: true,
      message: "Product marked as sold",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to mark product sold",
    });
  }
};
module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  getMyProducts,
  markProductSold
};