let read = (req, res, next) => res.status(200).render('index', {
    title: '/categories',
    subtitle: 'endpoint of categories'
  })
  export default read