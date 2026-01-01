import express from "express";
import cors from "cors";
import crypto from "crypto";

const app = express();
app.use(cors());
app.use(express.json());

// tymczasowa pamięć tokenów PRO
const tokens = new Set();

app.get("/", (req, res) => {
  res.send("Backend działa");
});

app.post("/create-token", (req, res) => {
  const token = "pro_" + crypto.randomBytes(8).toString("hex");
  tokens.add(token);
  res.json({ token });
});

app.get("/verify", (req, res) => {
  const { token } = req.query;
  if (tokens.has(token)) {
    return res.json({ ok: true });
  }
  res.status(403).json({ ok: false });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Server działa na porcie", PORT);
});
