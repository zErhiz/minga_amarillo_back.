import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import { getAccessToken } from "./testHelper.test.js";

describe('Test on /api/authors path', () => {
  let server = null;
  let api = null;
  let createdAuthorId = null;

  before(async () => {
    server = await app.listen(8000);
    api = request(app);
  });

  after(async () => {
    await server.close();
  });

  describe('POST /api/authors', () => {
    it('should create an author and return a success response and a status 201', async () => {
      const accessToken = getAccessToken();

      const requestBody = {
        name: "zenitsuaaaaaasaaa",
        last_name: "noyaiba",
        city: "Town",
        country: "China",
        date: "1990-01-01",
        photo: "https://example.com/photo.jpg"
      };

      const response = await api
        .post('/api/authors')
        .set('Authorization', `Bearer ${accessToken}`)
        .send(requestBody);

      expect(response.status).to.equal(201);
      expect(response.body.success).to.be.true;
      expect(response.body.Response).to.have.property('active', false);

      // Guardamos el ID del autor creado para usarlo en el siguiente test
      createdAuthorId = response.body.Response._id;
    });
  });

  describe('GET /api/authors/:id', () => {
    it('should retrieve an author by ID and return a success response and a status 200', async () => {
      const accessToken = getAccessToken();

      const response = await api
        .get(`/api/authors/${createdAuthorId}`)
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).to.equal(200);
      expect(response.body.succes).to.be.true;
    });
  }); 

  describe('GET /api/authors/admin', () => {
    it('should retrieve active and inactive authors and return a success response and a status 200', async () => {
      const accessToken = getAccessToken();

      const response = await api
        .get('/api/authors/admin')
        .set('Authorization', `Bearer ${accessToken}`);

      expect(response.status).to.equal(200);
      
      expect(response.body.activeAuthors).to.be.an('array');
      expect(response.body.inactiveAuthors).to.be.an('array');

  
    });
  });
}); 