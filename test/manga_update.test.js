import {expect} from 'chai'
import  request  from 'supertest'
import  app  from '../app.js'

describe('Test on /mangas path' ,()=>{
    let server=null
    let api=null
    
    let {id}=req.params

    before(async()=>{
        server=await app.listen (800)
        api=request(app)
    })
   describe('PUT /mangas',()=>{
    it('on succes should return status 200,succes true and manga update ',async()=>{
        const response = await api.put(`/mangas/${id}`)
        console.log(response.manga);

    })
   })

})