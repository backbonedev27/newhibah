const express = require("express");

const app = express();

// Start your server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const users_routes = require("./routes/userRoute");
const auth_routes = require("./routes/authRoute");
const permohonan_routes = require("./routes/permohonanRoute");

app.use("/api", users_routes);
app.use("/api", auth_routes);
app.use("/api", permohonan_routes);
