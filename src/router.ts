import { Router } from "express";
import { RecipeController } from "./controllers/RecipeController";
import { FireworksService } from "./services/FireworksService";

// init services
const fireworksService = new FireworksService(
	process.env.FIREWORKS_API_KEY || "",
	"prompt.txt",
);

// init controllers
const recipeController = new RecipeController(fireworksService);

// init routers
const recipeRouter = Router();
recipeRouter.get("/recipe", recipeController.getRecipe.bind(recipeController));

// main router
const router = Router();
router.use("/api/v1", recipeRouter);

export default router;
