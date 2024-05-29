import express from 'express';
import con from '../utils/db.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const router = express.Router();

router.post("/employee_login", (req, res) => {
  const sql = 'SELECT * FROM "Users" WHERE username = $1';
  con.query(sql, [req.body.email], async (err, result) => {
    if (err) {
      console.error("Query error:", err.message);
      return res.status(500).json({ loginStatus: false, Error: "Query error" });
    }

    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log("User found:", user);

      try {
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        console.log("Password match:", isMatch);

        if (isMatch && user.role === "employee") {
          const token = jwt.sign(
            { role: "employee", username: user.email, id: user.id },
            process.env.JWT_SECRET_KEY || "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token, { httpOnly: true });
          return res.json({ loginStatus: true });
        } else {
          return res.status(401).json({ loginStatus: false, Error: "Wrong username, password, or insufficient permissions" });
        }
      } catch (bcryptError) {
        console.error("Bcrypt error:", bcryptError.message);
        return res.status(500).json({ loginStatus: false, Error: "Password comparison error" });
      }
    } else {
      console.log("No user found with username:", req.body.email);
      return res.status(401).json({ loginStatus: false, Error: "Wrong username or password" });
    }
  });
});

router.get("/viewmenu", (req, res) => {
  const sql = `SELECT * FROM "Menus" WHERE TRIM(days) = TRIM(to_char(CURRENT_DATE, 'Day'))`;

  con.query(sql, (err, result) => {
    if (err) {
      console.error("Query error:", err.message);
      return res.status(500).json({ Status: false, Error: "Query Error" });
    }
    return res.json({ Status: true, Result: result.rows });
  });
});


router.get('/logout', (req, res) => {
  res.clearCookie('token');
  return res.json({ Status: true });
});

export { router as EmployeeRouter };
