const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const pool = require("./db");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        console.log("Login attempt:", email);

        if (!email) {
          return done(null, false);
        }

        if (!email.toLowerCase().endsWith("@thapar.edu")) {
          console.log("Blocked:", email);

          return done(null, false, {
            message: "Only @thapar.edu accounts are allowed",
          });
        }

        const existingUser = await pool.query(
          "SELECT * FROM users WHERE email = $1",
          [email]
        );

        if (existingUser.rows.length > 0) {
          console.log("Existing user found");

          return done(null, existingUser.rows[0]);
        }

        const newUser = await pool.query(
          `
          INSERT INTO users(name, email, profile_pic)
          VALUES($1, $2, $3)
          RETURNING *
          `,
          [
            profile.displayName,
            email,
            profile.photos?.[0]?.value || null,
          ]
        );

        console.log("New user created");

        return done(null, newUser.rows[0]);
      } catch (error) {
        console.error("Passport Error:", error);
        return done(error, null);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await pool.query(
      "SELECT * FROM users WHERE id = $1",
      [id]
    );

    done(null, result.rows[0]);
  } catch (error) {
    done(error, null);
  }
});