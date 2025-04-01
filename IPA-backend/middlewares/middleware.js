const path = require("path");
const fs = require("fs");
const dotenv = require("dotenv");

const envLocalPath = path.resolve(process.cwd(), ".env.local");
if (fs.existsSync(envLocalPath)) {
  dotenv.config({ path: envLocalPath });
} else {
  dotenv.config();
}

const validateApiKey = (req, res, next) => {
  const apiKey = req.headers["x-api-key"];

  if (!apiKey) {
    return res.status(401).json({ message: "API Key is missing" });
  }

  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ message: "Invalid API Key" });
  }

  next();
};

module.exports = {
  validateApiKey,
};
