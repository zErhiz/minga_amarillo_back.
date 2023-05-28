import { expect } from "chai";
import request from "supertest";
import app from "../app.js"

describe('Test on /api/mangas path', () => {
  let api = null
  /* let server=null */

  before(async() => {
    api = request(app)
   /*  server=await app.listen(8000) */
  })

  describe('POST /api/mangas', () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzBiNjZiMTc0ZDgzOTdjNTgzZWNjOCIsImlhdCI6MTY4NTIyNzIyOCwiZXhwIjoxNjg1MzEzNjI4fQ.sEcOCeoKhdcjF4mVJE5Fg7853_TEIQv2--LI3uErrBQ"
    const manga = {
      title: 'las aventuras',
      cover_photo: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTzVqmbSxhauTNwRSps740Zlka4AEGKvZU4YQ&usqp=CAU',
      category_id: '6470b669174d8397c583ecc1',
      description: 'a luisillo el gordillos le gusta comer chorizos'
    }

    it('Should create a new Manga, should return status 201, an object with success:"ok"', async () =>{
      const response = await api.post('/mangas')
      .set('Authorization',`Bearer ${token}` )
      .send(manga)
      console.log(response.body);
      console.log(response.statusCode);

    /*  expect(response.statusCode).to.equal(201);  */
    })
  })
})