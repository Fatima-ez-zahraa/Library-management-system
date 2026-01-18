import { Injectable, signal } from '@angular/core';
import { Book, Loan } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private books = signal<Book[]>([
    {
      id: 1,
      title: 'The Great Gatsby',
      author: 'F. Scott Fitzgerald',
      isbn: '978-0743273565',
      category: 'Fiction',
      publicationYear: 1925,
      available: true,
      description: 'A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.',
      location: 'Shelf A1',
      // thumbnail: 'URL_DE_L_IMAGE' // À remplacer par la valeur du CSV
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      isbn: '978-0446310789',
      category: 'Fiction',
      publicationYear: 1960,
      available: false,
      description: 'The story of young Scout Finch and her father Atticus in a racially divided Alabama town.',
      location: 'Shelf A2'
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      isbn: '978-0451524935',
      category: 'Science Fiction',
      publicationYear: 1949,
      available: true,
      description: 'A dystopian novel about totalitarianism and surveillance society.',
      location: 'Shelf B1'
    },
    {
      id: 4,
      title: 'Pride and Prejudice',
      author: 'Jane Austen',
      isbn: '978-0141439518',
      category: 'Romance',
      publicationYear: 1813,
      available: true,
      description: 'The story of Elizabeth Bennet and Mr. Darcy in Georgian-era England.',
      location: 'Shelf C1'
    },
    {
      id: 5,
      title: 'The Hobbit',
      author: 'J.R.R. Tolkien',
      isbn: '978-0547928241',
      category: 'Fantasy',
      publicationYear: 1937,
      available: false,
      description: 'The adventure of Bilbo Baggins, a hobbit who embarks on a quest with thirteen dwarves.',
      location: 'Shelf D1'
    }
  ]);

  private loans = signal<Loan[]>([
    {
      id: 1,
      bookId: 2,
      userId: 2,
      loanDate: new Date('2024-01-15'),
      returnDate: new Date('2024-02-15'),
      returned: false
    },
    {
      id: 2,
      bookId: 5,
      userId: 3,
      loanDate: new Date('2024-01-20'),
      returnDate: new Date('2024-02-20'),
      returned: false
    }
  ]);

  getBooks() {
    return this.books();
  }

  getBookById(id: number) {
    return this.books().find(book => book.id === id);
  }

  addBook(book: Omit<Book, 'id'>) {
    const newBook = {
      ...book,
      id: Math.max(...this.books().map(b => b.id)) + 1
    };
    this.books.update(books => [...books, newBook]);
  }

  updateBook(id: number, updates: Partial<Book>) {
    this.books.update(books =>
      books.map(book => book.id === id ? { ...book, ...updates } : book)
    );
  }

  deleteBook(id: number) {
    this.books.update(books => books.filter(book => book.id !== id));
  }

  getLoans() {
    return this.loans();
  }

  addLoan(loan: Omit<Loan, 'id'>) {
    const newLoan = {
      ...loan,
      id: Math.max(...this.loans().map(l => l.id)) + 1
    };
    this.loans.update(loans => [...loans, newLoan]);
    
    // Marquer le livre comme non disponible
    this.updateBook(loan.bookId, { available: false });
  }

  returnBook(loanId: number) {
    this.loans.update(loans =>
      loans.map(loan => loan.id === loanId ? { ...loan, returned: true } : loan)
    );
    
    // Trouver le livre et le marquer comme disponible
    const loan = this.loans().find(l => l.id === loanId);
    if (loan) {
      this.updateBook(loan.bookId, { available: true });
    }
  }
} 