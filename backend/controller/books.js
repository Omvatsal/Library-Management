const books = require('../model/book');

const handlebookrequest = async (req, res) => {
  try {
    const bookList = await books.find({});
    
    if (bookList.length === 0) {
      return res.status(404).json({ message: 'No books found' });
    }

    res.status(200).json(bookList);
  } catch (err) {
    console.error('Error fetching books:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};
const handlesearchrequest = async (req, res) => {
  try {
    const { query } = req.query;

    let book;

    if (!query) {
      book = await books.find({});
    } else {
      book = await books.find({
        $or: [
          { title: { $regex: query, $options: 'i' } },
          { genre: { $regex: query, $options: 'i' } }
        ]
      });
    }

    if (!book || book.length === 0) {
      return res.status(404).json({ message: 'No books found.' });
    }

    res.status(200).json(book);
  } catch (err) {
    console.error('Error searching for book:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


const handlegetrequest = async (req, res) => {
  try{
    const { id } = req.params;
    const book = await books.findById(id).populate("reviews.user", "firstName lastName");
    
    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  }
  catch (err) {
    console.error('Error fetching book by ID:', err);
    res.status(500).json({ message: 'Internal server error' });
}
}


module.exports = { handlebookrequest, handlesearchrequest, handlegetrequest };
