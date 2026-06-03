const pool = require("../config/db");

const createUser = async (req, res) => {
    try {
        const { name, email, profile_pic } = req.body;

        const result = await pool.query(
            `
            INSERT INTO users(name, email, profile_pic)
            VALUES($1, $2, $3)
            RETURNING *
            `,
            [name, email, profile_pic]
        );

        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Error creating user"
        });
    }
};

module.exports = {
    createUser
};