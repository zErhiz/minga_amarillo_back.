import Company from '../../models/Company.js'
let read = (req, res, next) => res.status(200).render('index', {
  title: '/companies',
  subtitle: 'endpoint of companies'
})