const express = require("express");
const cors = require("cors");
const path = require("path");
const bodyparser = require("body-parser");
const app = express();
global.__basedir = __dirname;

// Mengizinkan akses dari semua origin
app.use(cors());

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));

// Routes dan middleware lainnya
const users_routes = require("./routes/userRoute");
const auth_routes = require("./routes/authRoute");
const permohonan_routes = require("./routes/permohonanRoute");
const cekagama_routes = require("./routes/cekagamaRoute");
const agamas_routes = require("./routes/agamaRoute");
const persetujuan_routes = require("./routes/admin/persetujuanRoute");
const periode_routes = require("./routes/admin/periodeRoute");

app.use("/api", users_routes);
app.use("/api", auth_routes);
app.use("/api", permohonan_routes);
app.use("/api", cekagama_routes);
app.use("/api", agamas_routes);
app.use("/api", persetujuan_routes);
app.use("/api", periode_routes);

// Start your server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
