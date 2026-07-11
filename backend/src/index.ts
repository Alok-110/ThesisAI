import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js";
import researchRoutes from "./routes/research.routes";



dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.get("/health", (req, res) => {
  res.json({ status: 200, message: "health in check" })
})

app.use("/api/auth", authRoutes);
app.use("/api/research", researchRoutes);


const PORT = process.env.PORT;

app.listen(PORT || 5000, () => {
  console.log(`app is listening at ${PORT || 5000}`)
})
