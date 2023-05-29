import { expect } from "chai";
import request from "supertest";
import app from "../app.js";
import { getAccessToken, setAccessToken } from "./testHelper.test.js";

describe('Test on /api/auth path', () => {
  let server = null;
  let api = null;

  before(async () => {
    server = await app.listen(8000);
    api = request(app);
  });

  after(async () => {
    await server.close();
  });

  describe('POST /api/auth/signin', () => {
    it('On success should return status 200 and a message with: "user signed in!"', async () => {
      const signinRequestBody = {
        email: "soyunusuioaoaaadsaaaaaa@gmail.com",
        password: "hola1234"
      };

      const signinResponse = await api.post('/api/auth/signin').send(signinRequestBody);
      console.log('Response Status:', signinResponse.status);
      console.log('Response Body:', signinResponse.body);

      expect(signinResponse.status).to.equal(200);
      expect(signinResponse.body.success).to.be.true;
      expect(signinResponse.body.token).to.be.a('string');
      expect(signinResponse.body.user).to.be.an('object');
      expect(signinResponse.body.user.email).to.equal(signinRequestBody.email);
      expect(signinResponse.body.user.password).to.be.null;

      const accessToken = signinResponse.body.token;
      console.log(accessToken);

      setAccessToken(accessToken);
    });
  });
});