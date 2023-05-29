import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import { getAccessToken } from "./testHelper.test.js";

describe('Test on /api/chapters path', () => {
  let server = null;
  let api = null;

  before(async () => {
    server = await app.listen(8000);
    api = request(app);
  });

  after(async () => {
    await server.close();
  });

  describe('GET /api/chapters', () => {
    it('should retrieve chapters and return a success response and a status 200', async () => {
      const accessToken = getAccessToken();

      const response = await api
        .get('/api/chapters')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).to.equal(200);
      expect(response.body.succes).to.be.true;
      expect(response.body.response).to.be.an('array');
    });
  });

 
});