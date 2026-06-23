const express = require("express");
const cors = require("cors");
const sql = require("mssql");
const bcrypt = require("bcrypt");    

const app = express();

app.use(cors());
app.use(express.json());

const config = {
  user: "admin",
  password: "honnesh123",
  server: "user-management-db.c6v4mk6og46v.us-east-1.rds.amazonaws.com",
  database: "UserManagementDB",
  port: 1433,
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
};

sql.connect(config)
  .then(() => {
    console.log("Connected to AWS SQL Server");
  })
  .catch(err => {
    console.error("Database Connection Error:", err);
  });

app.get("/users", async (req, res) => {
  try {
    const result = await sql.query(`
SELECT
 Id as id,
 Username as username,
 Phone as phone,
 Email as email,
 Address as address,
 Status as status,
 Role as role
FROM Users
`);
    res.json(result.recordset);
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send(err);
  }
});

app.post("/users", async (req, res) => {
  try {
    const {
      username,
      phone,
      email,
      password,
      address,
      status,
      role,
    } = req.body;

    const hashedPassword =
  await bcrypt.hash(password, 10);

    await sql.query(`
      INSERT INTO Users
      (Username, Phone, Email, Password, Address, Status, Role)
      VALUES
      (
        '${username}',
        '${phone}',
        '${email}',
        '${hashedPassword}',
        '${address}',
        '${status}',
        '${role}'
      )
    `);

    res.status(201).json({
      message: "User Added Successfully",
    });
  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    await sql.query(`
      DELETE FROM Users
      WHERE Id = ${id}
    `);

    res.json({
      message: "User Deleted Successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.put("/users/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const {
      username,
      phone,
      email,
      address,
      status,
      role
    } = req.body;

    

    await sql.query(`
      UPDATE Users
      SET
        Username='${username}',
        Phone='${phone}',
        Email='${email}',
        Address='${address}',
        Status='${status}',
        Role='${role}'
      WHERE Id=${id}
    `);

    res.json({
      message: "User Updated Successfully"
    });

  } catch (err) {
    console.error(err);
    res.status(500).send(err);
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});