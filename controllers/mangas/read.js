let read = (req, res, next) => res.status(200).render('index', {
    title: '/mangas',
    subtitle: 'endpoint of mangas'
  })
  export default read