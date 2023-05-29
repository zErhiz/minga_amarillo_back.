import { expect, assert } from "chai";
import request from "supertest";
import app from "../app.js"



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