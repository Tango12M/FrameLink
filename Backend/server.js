import connectDB from "./src/config/database.js"; 
import config from "./src/config/config.js";
import app from "./src/app.js";

const PORT = config.PORT || 8000;

connectDB().catch((err) => {
  console.error("MongoDB connection failed:", err);
  process.exit(1);
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
