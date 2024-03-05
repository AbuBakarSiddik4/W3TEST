import cors from "cors";
import express from "express";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import adminRouter from "./routes/admin.js";
import transactionRouter from "./routes/transaction.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/admin", adminRouter);
app.use("/api/transaction", transactionRouter);

app.use((err, req, res, next) => {
  let status = err.status || 500;
  let message = err.message || "Internal Server Issue";
  return res.status(status).json({
    status: status,
    message: message,
  });
});

export default app;
