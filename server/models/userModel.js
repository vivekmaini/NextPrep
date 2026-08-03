const pool = require("../config/db");

const createUser = async (fullName, email, password) => {
  const query = `
    INSERT INTO users(full_name,email,password)
    VALUES($1,$2,$3)
    RETURNING *;
  `;

  const values = [fullName, email, password];

  const result = await pool.query(query, values);

  return result.rows[0];
};

module.exports = {
  createUser,
};