import { promises as fs } from "node:fs";
import * as path from "node:path";

export class FireworksService {
	private apiKey: string;
	private promptPath: string;

	constructor(apiKey: string, promptPath: string) {
		this.apiKey = apiKey;
		this.promptPath = promptPath;
	}

	private async loadPrompt(month: string, city: string): Promise<string> {
		const filePath = path.resolve(__dirname, '../../', this.promptPath); 
		let prompt = await fs.readFile(filePath, "utf-8");
		prompt = prompt.replace("{month}", month).replace("{city}", city);
		return prompt;
	}

	async getRecipe(month: string, city: string): Promise<string> {
		const prompt = await this.loadPrompt(month, city);

		const response = await fetch(
			"https://api.fireworks.ai/inference/v1/chat/completions",
			{
				method: "POST",
				headers: {
					Accept: "application/json",
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.apiKey}`,
				},
				body: JSON.stringify({
					model: "accounts/fireworks/models/llama-v3p1-8b-instruct",
					max_tokens: 16384,
					top_p: 1,
					top_k: 40,
					presence_penalty: 0,
					frequency_penalty: 0,
					temperature: 0.5,
					messages: [
						{
							role: "user",
							content: prompt,
						},
					],
				}),
			},
		);

		if (!response.ok) {
			throw new Error(`Error fetching recipe: ${response.statusText}`);
		}

		const data = await response.json();
		const recipe = data.choices[0].message.content;
		return recipe;
	}
}
