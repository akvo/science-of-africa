/**
 * Health Check API Tests
 *
 * Example tests demonstrating how to test Strapi API endpoints
 * using supertest for HTTP assertions.
 */

const request = require('supertest');
const { setupStrapi, teardownStrapi, getStrapi } = require('../helpers/strapi');

describe('Health Check API', () => {
  // Setup Strapi before all tests
  beforeAll(async () => {
    await setupStrapi();
  });

  // Cleanup after all tests
  afterAll(async () => {
    await teardownStrapi();
  });

  describe('GET /_health', () => {
    it('should return 204 status for health check', async () => {
      const strapi = getStrapi();

      const response = await request(strapi.server.httpServer)
        .get('/_health')
        .expect(204);
    });
  });

  describe('GET /api', () => {
    it('should return API information', async () => {
      const strapi = getStrapi();

      const response = await request(strapi.server.httpServer)
        .get('/api')
        .expect('Content-Type', /json/);

      // Strapi returns 404 for /api if no content types exist
      // This is expected behavior for a fresh install
      expect([200, 404]).toContain(response.status);
    });
  });
});
