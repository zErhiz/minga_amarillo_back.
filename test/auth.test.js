
 import { expect } from "chai";
import request from "supertest";
import app from "../app.js";

describe('Test on /api/auth path', () => {
  let server = null;
  let api = null;
  let accessToken = null;
  before(async () => {
    server = await app.listen(8000);
    api = request(app);
  });

  after(async () => {
    await server.close();
  });

  describe('POST /api/auth/signup', () => {
    it('On success should return status 201 and a message with: "user registered"', async () => {
      const requestBody = {
        email: "soyproaaaaaasaa@gmail.com",
        password: "hola1234",
        photo: "https://hola.com"
      };

      const response = await api.post('/api/auth/signup').send(requestBody);

      console.log('Response Status:', response.status);
      console.log('Response Body:', response.body);

      expect(response.status).to.equal(201);
      expect(response.text).to.equal('user registered');
    });
  });

  describe('POST /api/auth/signin', () => {
    it('On success should return status 200 and a message with: "user signed in!" and an object that is a string and a response body that has a email that is equal to the request body', async () => {
      const signinRequestBody  = {
        email: "silvina@mh.com.ar",
        password: "hola1234"
      };

      const signinResponse  = await api.post('/api/auth/signin').send(signinRequestBody);
      console.log('Response Status:', signinResponse.status);
      console.log('Response Body:', signinResponse.body);
      
      
      expect(signinResponse.status).to.equal(200);
      expect(signinResponse.body.success).to.be.true;
      expect(signinResponse.body.token).to.be.a('string');
      expect(signinResponse.body.user).to.be.an('object');
      expect(signinResponse.body.user.email).to.equal(signinRequestBody.email);
      expect(signinResponse.body.user.password).to.be.null;
      //token signin
      accessToken = signinResponse.body.token;
    });
  });
  describe('PUT /api/auth/role/author/:id', () => {
    it('On success should return status 200 and a message with: "The author is verified"', async () => {
        // obtenemos un id
        const authorsResponse = await api.get('/api/authors/admin').set('Authorization', `Bearer ${accessToken}`);
        const authorId = authorsResponse.body.activeAuthors[0].user_id; 
        console.log(authorId)
        // actualizamos el rol 
        const updateRoleResponse = await api
        .put(`/api/auth/role/author/${authorId}`)
        .set('Authorization', `Bearer ${accessToken}`);
        
        console.log('Response Status:', updateRoleResponse.status);
        console.log('Response Body:', updateRoleResponse.body);
        
        expect(updateRoleResponse.status).to.equal(200);
        expect(updateRoleResponse.body.success).to.be.true;
        expect(updateRoleResponse.body.message).to.equal('The author is verified');
    });
});
describe('PUT /api/auth/role/company/:id', () => {
    it('On success should return status 200 and a message with: "The Company is verified"', async () => {
        
        const companiesResponse = await api.get('/api/companies/admin').set('Authorization', `Bearer ${accessToken}`);
        const companyId = companiesResponse.body.activeCompany[0].user_id; 
        
        
        const updateRoleResponse = await api
        .put(`/api/auth/role/company/${companyId}`)
        .set('Authorization', `Bearer ${accessToken}`);
        
        console.log('Response Status:', updateRoleResponse.status);
        console.log('Response Body:', updateRoleResponse.body);
        
        expect(updateRoleResponse.status).to.equal(200);
        expect(updateRoleResponse.body.success).to.be.true;
        expect(updateRoleResponse.body.message).to.equal('The Company is verified');
    });
});
  describe('POST /api/auth/signout', () => {
   it('On success should return status 200 and a message with: "offline user"', async () => {
       const signoutResponseBody  = {
           email: "silvina@mh.com.ar"
         };
       const signoutResponse = await api.post('/api/auth/signout').send(signoutResponseBody).send(signoutResponseBody).set('Authorization', `Bearer ${accessToken}`);

     console.log('Response Status:', signoutResponse.status);
     console.log('Response Body:', signoutResponse.body);

     expect(signoutResponse.status).to.equal(200);
     expect(signoutResponse.text).to.equal('offline user');
   });
 }); 
}); 




describe ('Test on/auth path', ()=>{
    let server = null
    let api = null
    const assert = chai.assert
    const expect = chai.expect
    before (async ()=>{
        server = await app.listen(8000);
        api = request(app);
    })
    describe('POST /api/auth/signup', ()=>{
        it('Get a /mangas debe traerme 6',async() =>{
            const response =await request(app).get('/api/mangas')
            assert.equal(response.body.mangas.length,6)
        })
    
        it('Post a /user deberia crear un usuario',async() =>{
            const user = {
                name:'johanZ',
                mail: "alejandro59@mh.com.ar",
                password: "123456789",
                photo: "https://i.postimg.cc/fyJsspq8/image.png"
            }
    
            const response = await request(app).post('/api/auth/signup').send(user)
            assert.equal(response.body.success,true)
        })
    })
})
