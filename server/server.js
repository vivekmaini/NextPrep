require("dotenv").config();

require("./config/db");

const app = require("./app");
const { warmup } = require("./ai/warmup");

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(` Server is running on http://localhost:${PORT}`);
  warmup().catch(() => {});
});
