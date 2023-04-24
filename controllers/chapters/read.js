let read = (req, res, next) => res.status(200).render('index', {
    title: '/chapters',
    subtitle: 'endpoint of chapters'
  })
  export default read