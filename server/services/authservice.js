const bcrypt = require("bcrypt");
const { createUser } = require("../models/userModel");

const register = async (fullName, email, password) => {
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await createUser(
    fullName,
    email,
    hashedPassword
  );

  return user;
};

module.exports = {
  register,
};