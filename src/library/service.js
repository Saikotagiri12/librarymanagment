const Author  = require('./author');
const Book = require('./book');
const User = require('./user');
const AuditLog = require('./auditlog');

class LibraryService {
  // CRUD operations for Authors
  async createAuthor(createAuthorDto) {
    const author = new Author(createAuthorDto);
    return await author.save();
  }

  async getAllAuthors() {
    return await Author.find();
  }

  async getAuthorById(id) {
    return await Author.findById(id);
  }

  async updateAuthor(id, updateAuthorDto) {
    return await Author.findByIdAndUpdate(id, updateAuthorDto, { new: true });
  }

  async deleteAuthor(id) {
    return await Author.findByIdAndDelete(id);
  }

  // CRUD operations for Books
  async createBook(createBookDto) {
    const book = new Book(createBookDto);
    return await book.save();
  }

  async getAllBooks() {
    return await Book.find().populate('author');
  }

  async getBookById(id) {
    return await Book.findById(id).populate('author');
  }

  async updateBook(id, updateBookDto) {
    return await Book.findByIdAndUpdate(id, updateBookDto, { new: true });
  }

  async deleteBook(id) {
    return await Book.findByIdAndDelete(id);
  }

  // CRUD operations for Users
  async createUser(createUserDto) {
    const user = new User(createUserDto);
    return await user.save();
  }

  async getAllUsers() {
    return await User.find();
  }

  async getUserById(id) {
    return await User.findById(id);
  }

  async updateUser(id, updateUserDto) {
    return await User.findByIdAndUpdate(id, updateUserDto, { new: true });
  }

  async deleteUser(id) {
    return await User.findByIdAndDelete(id);
  }

  // Borrow and Return Books
  async borrowBook(userId, bookId) {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      throw new Error('User or Book not found');
    }

    if (user.borrowedBooks.length >= 5) {
      throw new Error('User has reached the maximum borrow limit');
    }

    user.borrowedBooks.push(bookId);
    await user.save();

    // Log the action
    await this.createAuditLog(userId, `Borrowed book: ${book.title}`);

    return book;
  }

  async returnBook(userId, bookId) {
    const user = await User.findById(userId);
    const book = await Book.findById(bookId);

    if (!user || !book) {
      throw new Error('User or Book not found');
    }

    user.borrowedBooks = user.borrowedBooks.filter(id => id.toString() !== bookId);
    await user.save();

    // Log the action
    await this.createAuditLog(userId, `Returned book: ${book.title}`);

    return book;
  }

  // Audit Logging
  async createAuditLog(userId, action) {
    const log = new AuditLog({ userId, action });
    return await log.save();
  }

  async getAuditLogs(userId, action) {
    const query = {};
    if (userId) query.userId = userId;
    if (action) query.action = action;

    return await AuditLog.find(query).populate('userId', 'name');
  }
}

module.exports = LibraryService;
