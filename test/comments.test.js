import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import { getAccessToken } from "./testHelper.test.js";

describe('Test on /api/comments path', () => {
  let server = null;
  let api = null;

  before(async () => {
    server = await app.listen(8000);
    api = request(app);
  });

  after(async () => {
    await server.close();
  });

  describe('GET /api/comments', () => {
    it('should retrieve an empty response and return a success response with status 200', async () => {
      const accessToken = getAccessToken();

      const response = await api
        .get('/api/comments')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).to.equal(200);
      expect(response.body.success).to.be.true;
      expect(response.body.response).to.be.an('array');
      
    });
  });

 
});