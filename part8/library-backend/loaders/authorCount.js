const Book = require("../models/book");

const authorCountLoader = ((authorIds) => {
    return Book.find({author: {$in: authorIds}}).then(books => {
        return authorIds.map(id => books.filter(b => b.author.toString() === id).length)
    })
})

module.exports = authorCountLoader