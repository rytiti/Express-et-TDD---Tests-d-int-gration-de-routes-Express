const connection = require('./connection'),
  db = connection.promise()


exports.findBookmarkById = async (bookmarkId) => {
  return db
    .query('SELECT * FROM bookmark WHERE id = ?', [bookmarkId])
    .then(([result]) => {
      return result[0]
    })
}

exports.createBookmark = async ({ url, title }) => {
  return db
    .query('INSERT INTO bookmark (url, title) VALUES (?, ?)', [url, title])
    .then(([result]) => {
      const bookmarkId = result.insertId
      return bookmarkId 
    })
}