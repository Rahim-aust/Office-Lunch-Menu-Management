import express from "express";
import con from "../utils/db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/adminlogin", (req, res) => {
  const sql = 'SELECT * FROM "Users" WHERE username = $1';
  con.query(sql, [req.body.email], async (err, result) => {
    if (err) {
      console.log("Query error:", err.message);
      return res.json({ loginStatus: false, Error: "Query error" });
    }

    if (result.rows.length > 0) {
      const user = result.rows[0];
      console.log("User found:", user);

      try {
        const isMatch = await bcrypt.compare(req.body.password, user.password);
        console.log("Password match:", isMatch);

        if (isMatch && user.role === "admin") {
          const token = jwt.sign(
            { role: "admin", username: user.email, id: user.id },
            "jwt_secret_key",
            { expiresIn: "1d" }
          );
          res.cookie("token", token);
          return res.json({ loginStatus: true });
        } else {
          return res.json({ loginStatus: false, Error: "Wrong username, password, or insufficient permissions" });
        }
      } catch (bcryptError) {
        console.log("Bcrypt error:", bcryptError.message);
        return res.json({ loginStatus: false, Error: "Password is incorrect" });
      }
    } else {
      console.log("No user found with username:", req.body.email);
      return res.json({ loginStatus: false, Error: "Wrong username or password" });
    }
  });
});

router.get("/menu", (req, res) => {
  const sql = 'SELECT * FROM "Menus"';
  con.query(sql, (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result.rows });
  });
});

router.post("/addmenu", (req, res) => {
  const { days, menu } = req.body;

  if (!days || !menu) {
    return res.json({ Status: false, Error: "Missing days or menu in request body" });
  }

  const checkSql = 'SELECT * FROM "Menus" WHERE days = $1 AND option = $2';

  con.query(checkSql, [days, menu], (err, result) => {
    if (err) {
      console.error("Query Error:", err);
      return res.json({ Status: false, Error: "Query Error" });
    }

    if (result.rows.length > 0) {
      return res.json({ Status: false, Error: "Menu item already exists for the given day" });
    } else {
      const insertSql = 'INSERT INTO "Menus" (days, option) VALUES ($1, $2)';

      con.query(insertSql, [days, menu], (err, result) => {
        if (err) {
          console.error("Query Error:", err);
          return res.json({ Status: false, Error: "Query Error" });
        }
        return res.json({ Status: true });
      });
    }
  });
});



router.get("/employee", (req, res) => {
  const sql = 'SELECT * FROM "Users" WHERE role = $1';
  con.query(sql, ['employee'], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result.rows });
  });
});

router.get("/employee/:id", (req, res) => {
  const id = req.params.id;
  const sql = 'SELECT * FROM "Users" WHERE id = $1';
  con.query(sql, [id], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" });
    return res.json({ Status: true, Result: result.rows });
  });
});

router.get("/admin_count", (req, res) => {
  const sql = 'SELECT count(id) as admin FROM "Users" WHERE role = $1';
  con.query(sql, ['admin'], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result.rows });
  });
});

router.get("/employee_count", (req, res) => {
  const sql = 'SELECT count(id) as employee FROM "Users" WHERE role = $1';
  con.query(sql, ['employee'], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result.rows });
  });
});

router.get("/admin_records", (req, res) => {
  const sql = 'SELECT * FROM "Users" WHERE role = $1';
  con.query(sql, ['admin'], (err, result) => {
    if (err) return res.json({ Status: false, Error: "Query Error" + err });
    return res.json({ Status: true, Result: result.rows });
  });
});

router.get("/logout", (req, res) => {
  res.clearCookie("token");
  return res.json({ Status: true });
});

export { router as adminRouter };
