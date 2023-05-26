import {expect} from 'chai'
import  request  from 'supertest'
import  app  from '../app.js'

describe('Test on /mangas paht' ,()=>{
    let server=null
    let api=null
    before(async()=>{
        server=await app.listen (800)
        api=request(app)
    })
   describe('PUT /mangas/:id',()=>{
    it('on succes should return status 200',()=>{

    })
   })

})