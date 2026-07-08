const pool = require("../config/db");

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;

    const activeResult = await pool.query(
      `
      SELECT COUNT(*)
      FROM products
      WHERE seller_id = $1
      AND status = 'available'
      `,
      [userId]
    );

    const soldResult = await pool.query(
      `
      SELECT COUNT(*)
      FROM products
      WHERE seller_id = $1
      AND status = 'sold'
      `,
      [userId]
    );

    res.json({
      success: true,
      user: req.user,
      activeListings: Number(
        activeResult.rows[0].count
      ),
      soldProducts: Number(
        soldResult.rows[0].count
      ),
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch profile",
    });
  }
};

const getSellerProfile = async (req, res) => {
  try {
    const { id } = req.params;

    // Seller information
    const userResult = await pool.query(
      `
      SELECT id, name, email
      FROM users
      WHERE id = $1
      `,
      [id]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Seller not found",
      });
    }

    // Active listings count
    const activeResult = await pool.query(
      `
      SELECT COUNT(*)
      FROM products
      WHERE seller_id = $1
      AND status = 'available'
      `,
      [id]
    );

    // Sold count
    const soldResult = await pool.query(
      `
      SELECT COUNT(*)
      FROM products
      WHERE seller_id = $1
      AND status = 'sold'
      `,
      [id]
    );

    // Current products
    const productsResult = await pool.query(
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
      [id]
    );

    res.json({
      success: true,
      user: userResult.rows[0],
      activeListings: Number(activeResult.rows[0].count),
      soldProducts: Number(soldResult.rows[0].count),
      products: productsResult.rows,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch seller profile",
    });
  }
};
module.exports = {
  getProfile,
  getSellerProfile,
};