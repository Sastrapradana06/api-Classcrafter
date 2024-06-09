const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

const homeRoute = require("./routes/homeRoute");
const guruRoute = require("./routes/guruRoute");
const mapelRoute = require("./routes/mapelRoute");
const siswaRoute = require("./routes/siswaRoute");
const authRoute = require("./routes/authRoute");
const kasRoute = require("./routes/kasRoute");
const uploadRoute = require("./routes/uploadRoute");

const corsOptions = {
  origin: ["http://example.com", "http://localhost:5173"],
  methods: "GET,POST",
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", homeRoute);
app.use("/guru", guruRoute);
app.use("/mapel", mapelRoute);
app.use("/siswa", siswaRoute);
app.use("/auth", authRoute);
app.use("/kas", kasRoute);
app.use("/upload", uploadRoute);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res
    .status(500)
    .json({ success: false, message: "Something broke!", error: err.message });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
