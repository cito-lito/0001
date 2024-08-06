import http from "node:http";
import express from "express";
import bodyParser from "body-parser";
import router from "./router";

export function createServer(): http.Server {
	const app = express();

	app.use(bodyParser.json());
	app.use(router);
	// ...

	return http.createServer(app);
}
