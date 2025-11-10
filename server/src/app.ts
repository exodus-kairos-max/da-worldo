// import express from "express";
// import cors from "cors";
// import contactRoutes from "./routes/contactRoutes";
// import authRoutes from "./routes/authRoutes";
// import addressRoutes from "./routes/addressRoutes";
// import productRoutes from "./routes/productRoutes";
// import razorpayRoutes from "./routes/razorpayRoutes";
// import orderRoutes from "./routes/orderRoutes";

// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());

// // Routes
// app.get("/", (req, res) => {
//   res.json({ message: "server chal raha hai" });
// });

// app.use("/api/contact", contactRoutes);
// app.use("/api/auth", authRoutes);
// app.use("/api/address", addressRoutes);
// app.use("/api/products", productRoutes);
// app.use("/api/v2/razorpay", razorpayRoutes);
// app.use("/api/orders", orderRoutes);

// export default app;
import express from "express";
import cors from "cors";
import contactRoutes from "./routes/contactRoutes";
import authRoutes from "./routes/authRoutes";
import addressRoutes from "./routes/addressRoutes";
import productRoutes from "./routes/productRoutes";
import razorpayRoutes from "./routes/razorpayRoutes";
import orderRoutes from "./routes/orderRoutes";

const app = express();

// CRITICAL FIX: Handle Buffer body from API Gateway before JSON parsing
app.use((req, res, next) => {
  if (req.body && Buffer.isBuffer(req.body)) {
    try {
      // Convert Buffer to string and parse as JSON
      const bodyString = req.body.toString("utf8");
      req.body = JSON.parse(bodyString);
      console.log("✅ Converted Buffer to JSON:", req.body);
    } catch (error) {
      console.error("❌ Error parsing Buffer body:", error);
    }
  }
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get("/", (req, res) => {
  res.json({ message: "server chal raha hai" });
});

app.use("/api/contact", contactRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/address", addressRoutes);
app.use("/api/products", productRoutes);
app.use("/api/v2/razorpay", razorpayRoutes);
app.use("/api/orders", orderRoutes);

export default app;