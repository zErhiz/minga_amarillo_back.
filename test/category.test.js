import { expect } from "chai";
import  request  from "supertest";
import app from "../app.js";

describe('Test on /api/categories path',()=>{
   
    let server = null;
    let api = null; 

    before( async () => {
        server = await app.listen(8000);
        api = request(app)
    })

    describe('GET /api/categories', () => {
        it('On success should return status 200 and an array of categories',async()=>{
            const {body, statusCode} = await api.get('/api/categories');
           /*   console.log(response.body) 
            console.log(response.statusCode) */
         //status 200
         expect(statusCode).to.equal(200);
         expect(body).to.have.property('categories').that.is.an('array');
         expect(body.categories.length).to.be.greaterThan(0);
        })
        after(async ()=>{
            server.close();
        })
    })
})