require('dotenv').config({ path: __dirname + '/.env' });
const { ensureInterviewTables } = require('./models/interviewModel');

const run = async () => {
  console.log("Running migration...");
  await ensureInterviewTables();
  console.log("Migration complete!");
  process.exit(0);
};
run();
