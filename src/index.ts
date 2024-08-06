import { createServer } from "./server";

const port = process.env.PORT || 8080;

async function main() {
	try {
		const server = createServer();

		server.listen(port, () => {
			console.log(`Server running on http://localhost:${port}`);
		});
	} catch (error) {
		console.error("Failed to start the server:", error);
		process.exit(1);
	}
}

main();
