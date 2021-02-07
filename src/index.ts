import express from "express";
import cors from "cors";
import { GETBaseRouter } from "./routes/GET-base";
import { POSTBaseRouter } from "./routes/POST-base";
import { API_KEY } from "./constants";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/mail-notification", [GETBaseRouter, POSTBaseRouter]);

app.all("*", (_, res) => {
  res.sendStatus(404);
});

const PORT = 3000 || process.env.PORT;

app.listen(PORT, () =>
  console.log(`Mail server listening on port ${PORT} using API key: ${API_KEY}`)
);
