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

module.exports = {
  getProfile,
};