import dotenv from "dotenv-safe";

dotenv.config({
	debug: true,
});

export const { API_KEY, BASE } = process.env;
export const PORT = process.env.PORT || 3000;

export const { EMAIL, PASSWORD, OAUTH_CLIENTID, OAUTH_CLIENT_SECRET, OAUTH_REFRESH_TOKEN } = process.env;
