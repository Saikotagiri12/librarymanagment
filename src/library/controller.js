const express = require('express');
const LibraryService = require('./service');

class LibraryController {
  constructor() {
    this.libraryService = new LibraryService();
  }

  // Authors
  async createAuthor(req, res) {
    try {
      const createAuthorDto = req.body;
      const result = await this.libraryService.createAuthor(createAuthorDto);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllAuthors(req, res) {
    try {
      const result = await this.libraryService.getAllAuthors();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAuthorById(req, res) {
    try {
      const { id } = req.params;
      const result = await this.libraryService.getAuthorById(id);
      if (!result) {
        return res.status(404).json({ message: 'Author not found' });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateAuthor(req, res) {
    try {
      const { id } = req.params;
      const updateAuthorDto = req.body;
      const result = await this.libraryService.updateAuthor(id, updateAuthorDto);
      if (!result) {
        return res.status(404).json({ message: 'Author not found' });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteAuthor(req, res) {
    try {
      const { id } = req.params;
      const result = await this.libraryService.deleteAuthor(id);
      if (!result) {
        return res.status(404).json({ message: 'Author not found' });
      }
      res.json({ message: 'Author deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Books
  async createBook(req, res) {
    try {
      const createBookDto = req.body;
      const result = await this.libraryService.createBook(createBookDto);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllBooks(req, res) {
    try {
      const result = await this.libraryService.getAllBooks();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getBookById(req, res) {
    try {
      const { id } = req.params;
      const result = await this.libraryService.getBookById(id);
      if (!result) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateBook(req, res) {
    try {
      const { id } = req.params;
      const updateBookDto = req.body;
      const result = await this.libraryService.updateBook(id, updateBookDto);
      if (!result) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteBook(req, res) {
    try {
      const { id } = req.params;
      const result = await this.libraryService.deleteBook(id);
      if (!result) {
        return res.status(404).json({ message: 'Book not found' });
      }
      res.json({ message: 'Book deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Users
  async createUser(req, res) {
    try {
      const createUserDto = req.body;
      const result = await this.libraryService.createUser(createUserDto);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const result = await this.libraryService.getAllUsers();
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserById(req, res) {
    try {
      const { id } = req.params;
      const result = await this.libraryService.getUserById(id);
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const { id } = req.params;
      const updateUserDto = req.body;
      const result = await this.libraryService.updateUser(id, updateUserDto);
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params;
      const result = await this.libraryService.deleteUser(id);
      if (!result) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Borrow and Return Books
  async borrowBook(req, res) {
    try {
      const { userId, bookId } = req.body;
      const result = await this.libraryService.borrowBook(userId, bookId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async returnBook(req, res) {
    try {
      const { userId, bookId } = req.body;
      const result = await this.libraryService.returnBook(userId, bookId);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Audit Logs
  async getAuditLogs(req, res) {
    try {
      const { userId, action } = req.query;
      const result = await this.libraryService.getAuditLogs(userId, action);
      res.json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

const router = express.Router();
const libraryController = new LibraryController();

// Define routes
router.post('/authors', (req, res) => libraryController.createAuthor(req, res));
router.get('/authors', (req, res) => libraryController.getAllAuthors(req, res));
router.get('/authors/:id', (req, res) => libraryController.getAuthorById(req, res));
router.put('/authors/:id', (req, res) => libraryController.updateAuthor(req, res));
router.delete('/authors/:id', (req, res) => libraryController.deleteAuthor(req, res));

router.post('/books', (req, res) => libraryController.createBook(req, res));
router.get('/books', (req, res) => libraryController.getAllBooks(req, res));
router.get('/books/:id', (req, res) => libraryController.getBookById(req, res));
router.put('/books/:id', (req, res) => libraryController.updateBook(req, res));
router.delete('/books/:id', (req, res) => libraryController.deleteBook(req, res));

router.post('/users', (req, res) => libraryController.createUser(req, res));
router.get('/users', (req, res) => libraryController.getAllUsers(req, res));
router.get('/users/:id', (req, res) => libraryController.getUserById(req, res));
router.put('/users/:id', (req, res) => libraryController.updateUser(req, res));
router.delete('/users/:id', (req, res) => libraryController.deleteUser(req, res));

router.post('/borrow', (req, res) => libraryController.borrowBook(req, res));
router.post('/return', (req, res) => libraryController.returnBook(req, res));

router.get('/audit-logs', (req, res) => libraryController.getAuditLogs(req, res));

module.exports = router;
