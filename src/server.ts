import * as dotenv from "dotenv";
dotenv.config();

import cors from "cors";
import express from "express";
import connectToDatabase from "./db";
import productRoutes from "./routes/product";
import orderRouter from "./routes/order";
import { webhookHandler } from "./webhook";

const app = express();
app.use(cors());
app.use(express.json());

connectToDatabase();

// app.get("/ping", (req, res) => {
//   res.send("pong");
// });

app.post("/webhook", express.raw({ type: "application/json" }), webhookHandler);

app.use("/products", productRoutes);
app.use("/orders", orderRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server up and running at port", PORT);
});
