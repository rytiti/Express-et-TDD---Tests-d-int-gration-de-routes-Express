const router = require('express').Router()
const Bookmark = require('./model')

router.get('/', (req, res) => {
  res.status(200).json({ message: 'Hello World!' })
})

router.get('/:id', async (req, res) => {
  console.log("req params =>", req.params)
   id  = req.params.id
   if (!id) return res.status(404).json({ error: 'Bookmark not found' })
   await Bookmark.findBookmarkById(id)
    .then(bookmark => {
      if (!bookmark) {
        return res.status(404).json({ error: 'Bookmark not found' })
      } else {
        return res.status(200).json({ bookmark : bookmark })
      }
    })
})

router.post('/bookmarks', async (req, res) => {
  if (!req.body?.title || !req.body?.url) return res.status(422).json({ error: "required field(s) missing" })

  await Bookmark.createBookmark({ ...req.body })
    .then(async createdId => {
      await Bookmark.findBookmarkById(createdId)
        .then(bookmark => {
          res.status(201).json(bookmark)
        })
    })
    .catch(err => {
      console.error(err)
      res.status(500).send('Error saving the movie')
    })
})

module.exports = router