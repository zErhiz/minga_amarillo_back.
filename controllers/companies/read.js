let read = (req, res, next) => res.status(200).render('index', {
    title: '/companies',
    subtitle: 'endpoint of companies'
  })
  export default read