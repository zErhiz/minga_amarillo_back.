 import { expect } from "chai";
import request from "supertest";
import app from "../app.js"

describe('Test on /api/mangas path',async () => {
  let api = null
  let server=null

  before(async() => {
    api = request(app)
    server=await app.listen(8000) 
  })

  describe('POST /api/mangas/1', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzBiNjZiMTc0ZDgzOTdjNTgzZWNjOCIsImlhdCI6MTY4NTMyNDI1NCwiZXhwIjoxNjg1NDEwNjU0fQ.N9FCukje0Eukt0HTSjLnHggaX4Hxt1Js8JIwULFnBrc"
    const manga = {
      title: 'las aveneeeeeeeeee',
      cover_photo: 'https://tse2.mm.bing.net/th?id=OIP.zHhK3wS2NgkxnwshT5DFigHaEN&pid=Api&P=0&h=180',
      category_id: '6470b669174d8397c583ecc1',
      description: 'vamos dios '
    }

    it('Should create a new Manga, should return status 201, an object with success:"ok"', async () =>{
      const response = await api.post('/api/mangas/1')
      .set('Authorization',`Bearer ${token}`)
      .send(manga)
     
      console.log(response.body);
      console.log(response.statusCode);

      expect(response.statusCode).to.equal(201)  
    })
  })
}) 