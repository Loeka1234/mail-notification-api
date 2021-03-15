import express from "express";
import cors from "cors";
import { GETBaseRouter } from "./routes/GET-base";
import { POSTBaseRouter } from "./routes/POST-base";
import { API_KEY, BASE, PORT } from "./constants";
import { logger } from "./middlewares/logger";

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger)

app.use(GETBaseRouter);
app.use(POSTBaseRouter);

app.all("*", (_, res) => {
	return res.status(404).json({
		error: "Not Found",
	});
});

app.listen(PORT, () => console.log(`Mail server listening on port ${PORT} using API key: ${API_KEY}`));
