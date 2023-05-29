import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import { getAccessToken } from "./testHelper.test.js";

describe('Test on /api/companies/admin path', () => {
  let server = null;
  let api = null;

  before(async () => {
    server = await app.listen(8000);
    api = request(app);
  });

  after(async () => {
    await server.close();
  });

  describe('GET /api/companies/admin', () => {
    it('should retrieve the active and inactive companies and return a success response with status 200', async () => {
      const accessToken = getAccessToken();

      const response = await api
        .get('/api/companies/admin')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).to.equal(200);
      expect(response.body.activeCompany).to.be.an('array');
    });
  });

  
});