const books=require('../model/book');
const users=require('../model/user');

const handleRentRequest = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body; 

    try {
        const book = await books.findById(id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        if (book.rentedBy.includes(userId)) {
            return res.status(400).json({ message: 'You have already rented this book' });
        }

        book.rentedBy.push(userId);
        book.rentCount += 1;

        await book.save();
        await users.findByIdAndUpdate(userId, { $push: { books: id } });

        res.status(200).json({ message: 'Book rented successfully', book });
    } catch (err) {
        console.error('Error renting book:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}

module.exports = { handleRentRequest };