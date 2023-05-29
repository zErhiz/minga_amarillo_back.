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
    const email = "wñpss0sdsgsuassslsados@gmail.com";
    const password = "qweuiop12";

    it('Should user registered, On success should return status 201,and a response body that have a property called response', async () =>{
      const response = await api.post('/api/auth/signup').send({"email": email, "password": password})
     

      expect(response.body.success).to.equal("user registered");
      expect(response.statusCode).to.equal(201)
      expect(response.body).to.have.property("response")  
      
    })
  })

    after(async() => {
    server.close();
  })

}) */
