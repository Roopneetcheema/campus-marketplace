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
    } = req.body;

    if (
      !title ||
      !description ||
      !price ||
      !category ||
      !condition_type ||
      !contact_method
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const seller_id = req.user.id;

    const result = await pool.query(
      `
      INSERT INTO products
      (
        title,
        description,
        price,
        category,
        condition_type,
        contact_method,
        seller_id
      )
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        title,
        description,
        price,
        category,
        condition_type,
        contact_method,
        seller_id,
      ]
    );

    res.status(201).json({
      success: true,
      product: result.rows[0],
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
        users.name AS seller_name
      FROM products
      JOIN users
      ON products.seller_id = users.id
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

    const result = await pool.query(
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

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    res.json({
      success: true,
      product: result.rows[0],
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch product",
    });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
};