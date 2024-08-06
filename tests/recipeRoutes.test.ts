import request from 'supertest';
import { createServer } from '../src/server';
import http from 'node:http';

// Mock FireworksService
jest.mock('../src/services/FireworksService', () => {
  return {
    FireworksService: jest.fn().mockImplementation(() => {
      return {
        getRecipe: jest.fn().mockResolvedValue(JSON.stringify({
          name: "Mocked Recipe",
          duration_in_minutes: 30,
          portions: 4,
          ingredients: [
            { name: "Mocked Ingredient 1", quantity: 2, unit: "pieces" },
            { name: "Mocked Ingredient 2", quantity: 100, unit: "grams" },
          ],
          steps: [
            { description: "Mocked Step 1" },
            { description: "Mocked Step 2" },
          ],
        })),
      };
    }),
  };
});

let testApp: http.Server;
beforeAll(() => {
  testApp = createServer();
});

describe('Recipe Routes', () => {
  test('GET /api/v1/recipe', async () => {
    const response = await request(testApp).get('/api/v1/recipe?month=january&city=Barcelona');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      name: "Mocked Recipe",
      duration_in_minutes: 30,
      portions: 4,
      ingredients: [
        { name: "Mocked Ingredient 1", quantity: 2, unit: "pieces" },
        { name: "Mocked Ingredient 2", quantity: 100, unit: "grams" },
      ],
      steps: [
        { description: "Mocked Step 1" },
        { description: "Mocked Step 2" },
      ],
    });
  });
});
