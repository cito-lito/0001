import type { Request, Response } from "express";
import type { FireworksService } from "../services/FireworksService";

export class RecipeController {
	constructor(private fireworksService: FireworksService) {}

	async getRecipe(req: Request, res: Response) {
		try {
			const { month, city } = req.query;

			// TODO: Add validation for valid month and valid cities, like pass user location to get the city

			let recipe = await this.fireworksService.getRecipe(
				month as string,
				city as string,
			);

			recipe = JSON.parse(recipe);
			console.log(recipe);
			return res.status(200).json(recipe);
		} catch (error) {
			return res.status(500).json({ message: (error as Error).message });
		}
	}
}
