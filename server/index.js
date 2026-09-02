// const express = require("express");
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const dotenv = require("dotenv");
// const Connection = require("./database/db");
// const Routes = require("./router/authRouter");
// const salon = require("./router/registerSalon");
// const path = require("path");
// const Booking = require("./router/bookingRouter");
// const paymentRouter = require("./router/paymentRouter");

// dotenv.config();
// const app = express();

// const allowedOrigins = [
//   "https://salon-ease-qyj9.vercel.app",
  
//   "https://salon-ease-qyj9-3ch6ctynt-divyanshu-singhs-projects-28ae076b.vercel.app",
//   "http://localhost:5173",
//   "http://127.0.0.1:5173",
//   ...(process.env.CORS_ORIGINS
//     ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
//     : []),
// ];

// app.use(
//   cors({
//     origin: (origin, callback) => {
//       if (!origin || allowedOrigins.includes(origin)) {
//         return callback(null, true);
//       }
//       return callback(new Error("Not allowed by CORS"));
//     },
//     credentials: true,
//   })
// );

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

// Connection();

// app.use("/api", Routes);
// app.use("/api", salon);
// app.use("/api", Booking);
// app.use("/api/payment", paymentRouter);
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// app.get("/", (req, res) => {
//   res.send("API running...");
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () =>
//   console.log(` Server running on http://localhost:${PORT}`)
// );


const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const Connection = require("./database/db");
const Routes = require("./router/authRouter");
const salon = require("./router/registerSalon");
const path = require("path");
const Booking = require("./router/bookingRouter");
const paymentRouter = require("./router/paymentRouter");

dotenv.config();
const app = express();

const staticAllowedOrigins = [
  "https://salon-ease-qyj9.vercel.app",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  ...(process.env.CORS_ORIGINS
    ? process.env.CORS_ORIGINS.split(",").map((origin) => origin.trim())
    : []),
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true);

      if (staticAllowedOrigins.includes(origin) || origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Express automatically handles preflight requests via app.use(cors()) 
// DO NOT use app.options("*", cors())

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

Connection();

app.use("/api", Routes);
app.use("/api", salon);
app.use("/api", Booking);
app.use("/api/payment", paymentRouter);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("API running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(` Server running on http://localhost:${PORT}`)
);