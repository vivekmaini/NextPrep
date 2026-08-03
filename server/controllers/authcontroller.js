const { registerSchema } = require("../validators/authValidator");
const authService = require("../services/authService");

const register = async (req, res) => {
  try {
    const { error } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      });
    }

    const { fullName, email, password } = req.body;

    const user = await authService.register(
      fullName,
      email,
      password
    );

    res.status(201).json({
      success: true,
      message: "User Registered Successfully",
      user,
    });

  } catch (err) {

    res.status(500).json({
      success: false,
      message: err.message,
    });

  }
};

module.exports = {
  register,
};