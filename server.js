const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/offers", require("./routes/offers"));
app.use("/api/book", require("./routes/bookings"));


app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
  });
