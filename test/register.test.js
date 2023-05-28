/* import { expect } from "chai";
import request from "supertest";
import app from "../app.js"

describe('Test on /api/auth/signup path', () => {
  let server = null
  let api = null

  before(async() => {
    server = await app.listen(8000)
    api = request(app)
  })

  describe('POST /api/auth/signup', () => {
    const email = "wowaura123456hts0@gmail.com";
    const password = "qwertyuiop12";

    it('Should create a new user, On success should return status 201', async () =>{
      const response = await api.post('/api/auth/signup').send({"email": email, "password": password})
      console.log(response.body);
      console.log(response.statusCode);

      expect(response.statusCode).to.equal(201);
    })
  })

    after(async() => {
    server.close();
  })

})
 */