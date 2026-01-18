import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/book.model';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="books-page">
      <div class="page-header">
        <div class="header-content">
          <h1>Books Management</h1>
          <p>Manage your library's book collection</p>
        </div>
        <button class="add-btn" (click)="showAddForm = true">
          <span class="icon">➕</span>
          Add New Book
        </button>
      </div>
      
      <div class="search-bar">
        <div class="search-input">
          <span class="search-icon">🔍</span>
          <input 
            type="text" 
            placeholder="Search books by title, author, or ISBN..."
            [(ngModel)]="searchTerm"
          >
        </div>
        <div class="filter-options">
          <select [(ngModel)]="categoryFilter">
            <option value="">All Categories</option>
            <option value="Fiction">Fiction</option>
            <option value="Science Fiction">Science Fiction</option>
            <option value="Romance">Romance</option>
            <option value="Fantasy">Fantasy</option>
          </select>
          <select [(ngModel)]="statusFilter">
            <option value="">All Status</option>
            <option value="available">Available</option>
            <option value="unavailable">Borrowed</option>
          </select>
        </div>
      </div>
      
      <div class="books-table">
        <table>
          <thead>
            <tr>
              <th>Cover</th>
              <th>Title</th>
              <th>Author</th>
              <th>ISBN</th>
              <th>Category</th>
              <th>Year</th>
              <th>Status</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let book of filteredBooks" class="book-row">
              <td>
                <div class="book-cover">📖</div>
              </td>
              <td>
                <div class="book-title">{{ book.title }}</div>
              </td>
              <td>{{ book.author }}</td>
              <td>{{ book.isbn }}</td>
              <td>
                <span class="category-badge">{{ book.category }}</span>
              </td>
              <td>{{ book.publicationYear }}</td>
              <td>
                <span class="status-badge" [class.available]="book.available" [class.unavailable]="!book.available">
                  {{ book.available ? 'Available' : 'Borrowed' }}
                </span>
              </td>
              <td>{{ book.location }}</td>
              <td>
                <div class="action-buttons">
                  <button class="action-btn edit" (click)="editBook(book)" title="Edit">
                    ✏️
                  </button>
                  <button class="action-btn delete" (click)="deleteBook(book.id)" title="Delete">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Add/Edit Book Modal -->
      <div *ngIf="showAddForm || editingBook" class="modal-overlay" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ editingBook ? 'Edit Book' : 'Add New Book' }}</h2>
            <button class="close-btn" (click)="closeModal()">✕</button>
          </div>
          
          <form class="modal-form" (ngSubmit)="saveBook()">
            <div class="form-row">
              <div class="form-group">
                <label for="title">Title *</label>
                <input type="text" id="title" [(ngModel)]="bookForm.title" name="title" required>
              </div>
              <div class="form-group">
                <label for="author">Author *</label>
                <input type="text" id="author" [(ngModel)]="bookForm.author" name="author" required>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="isbn">ISBN *</label>
                <input type="text" id="isbn" [(ngModel)]="bookForm.isbn" name="isbn" required>
              </div>
              <div class="form-group">
                <label for="category">Category *</label>
                <select id="category" [(ngModel)]="bookForm.category" name="category" required>
                  <option value="">Select Category</option>
                  <option value="Fiction">Fiction</option>
                  <option value="Science Fiction">Science Fiction</option>
                  <option value="Romance">Romance</option>
                  <option value="Fantasy">Fantasy</option>
                  <option value="Mystery">Mystery</option>
                  <option value="Biography">Biography</option>
                </select>
              </div>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="year">Publication Year *</label>
                <input type="number" id="year" [(ngModel)]="bookForm.publicationYear" name="publicationYear" required>
              </div>
              <div class="form-group">
                <label for="location">Location</label>
                <input type="text" id="location" [(ngModel)]="bookForm.location" name="location">
              </div>
            </div>
            
            <div class="form-group">
              <label for="description">Description</label>
              <textarea id="description" [(ngModel)]="bookForm.description" name="description" rows="3"></textarea>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn-primary">{{ editingBook ? 'Update' : 'Add' }} Book</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .books-page {
      padding: 2rem;
      background: #f8f9fa;
      min-height: 100vh;
    }

    .page-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 2rem;
    }

    .header-content h1 {
      font-size: 2.5rem;
      font-weight: bold;
      color: #2c3e50;
      margin: 0 0 0.5rem 0;
    }

    .header-content p {
      color: #7f8c8d;
      margin: 0;
    }

    .add-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 10px;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .add-btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    }

    .search-bar {
      display: flex;
      gap: 1rem;
      margin-bottom: 2rem;
      align-items: center;
    }

    .search-input {
      flex: 1;
      position: relative;
    }

    .search-icon {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #7f8c8d;
    }

    .search-input input {
      width: 100%;
      padding: 0.75rem 1rem 0.75rem 2.5rem;
      border: 2px solid #ecf0f1;
      border-radius: 10px;
      font-size: 1rem;
      transition: all 0.3s ease;
    }

    .search-input input:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    .filter-options {
      display: flex;
      gap: 1rem;
    }

    .filter-options select {
      padding: 0.75rem 1rem;
      border: 2px solid #ecf0f1;
      border-radius: 10px;
      font-size: 1rem;
      background: white;
      cursor: pointer;
    }

    .books-table {
      background: white;
      border-radius: 15px;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      overflow: hidden;
    }

    table {
      width: 100%;
      border-collapse: collapse;
    }

    th {
      background: #f8f9fa;
      padding: 1rem;
      text-align: left;
      font-weight: 600;
      color: #2c3e50;
      border-bottom: 2px solid #ecf0f1;
    }

    td {
      padding: 1rem;
      border-bottom: 1px solid #ecf0f1;
      vertical-align: middle;
    }

    .book-row:hover {
      background: #f8f9fa;
    }

    .book-cover {
      font-size: 1.5rem;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
      color: white;
    }

    .book-title {
      font-weight: 600;
      color: #2c3e50;
    }

    .category-badge {
      background: #e3f2fd;
      color: #1976d2;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-badge.available {
      background: #d4edda;
      color: #155724;
    }

    .status-badge.unavailable {
      background: #f8d7da;
      color: #721c24;
    }

    .action-buttons {
      display: flex;
      gap: 0.5rem;
    }

    .action-btn {
      width: 35px;
      height: 35px;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-size: 1rem;
    }

    .action-btn.edit {
      background: #fff3cd;
      color: #856404;
    }

    .action-btn.edit:hover {
      background: #ffeaa7;
    }

    .action-btn.delete {
      background: #f8d7da;
      color: #721c24;
    }

    .action-btn.delete:hover {
      background: #f5c6cb;
    }

    /* Modal Styles */
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 1000;
    }

    .modal {
      background: white;
      border-radius: 15px;
      width: 90%;
      max-width: 600px;
      max-height: 90vh;
      overflow-y: auto;
    }

    .modal-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1.5rem;
      border-bottom: 2px solid #ecf0f1;
    }

    .modal-header h2 {
      margin: 0;
      color: #2c3e50;
    }

    .close-btn {
      background: none;
      border: none;
      font-size: 1.5rem;
      cursor: pointer;
      color: #7f8c8d;
    }

    .modal-form {
      padding: 1.5rem;
    }

    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 600;
      color: #2c3e50;
    }

    .form-group input,
    .form-group select,
    .form-group textarea {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ecf0f1;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .form-group input:focus,
    .form-group select:focus,
    .form-group textarea:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 0 3px rgba(52, 152, 219, 0.1);
    }

    .form-actions {
      display: flex;
      gap: 1rem;
      justify-content: flex-end;
      margin-top: 2rem;
    }

    .btn-secondary {
      padding: 0.75rem 1.5rem;
      border: 2px solid #ecf0f1;
      background: white;
      color: #7f8c8d;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-secondary:hover {
      background: #f8f9fa;
    }

    .btn-primary {
      padding: 0.75rem 1.5rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      font-weight: 600;
      transition: all 0.3s ease;
    }

    .btn-primary:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
    }

    @media (max-width: 768px) {
      .books-page {
        padding: 1rem;
      }
      
      .page-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }
      
      .search-bar {
        flex-direction: column;
      }
      
      .filter-options {
        width: 100%;
      }
      
      .books-table {
        overflow-x: auto;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class BooksComponent {
  bookService = inject(BookService);
  
  books = this.bookService.getBooks();
  searchTerm = '';
  categoryFilter = '';
  statusFilter = '';
  showAddForm = false;
  editingBook: Book | null = null;
  
  bookForm = {
    title: '',
    author: '',
    isbn: '',
    category: '',
    publicationYear: new Date().getFullYear(),
    location: '',
    description: '',
    available: true
  };

  get filteredBooks() {
    return this.books.filter(book => {
      const matchesSearch = !this.searchTerm || 
        book.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.author.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        book.isbn.includes(this.searchTerm);
      
      const matchesCategory = !this.categoryFilter || book.category === this.categoryFilter;
      
      const matchesStatus = !this.statusFilter || 
        (this.statusFilter === 'available' && book.available) ||
        (this.statusFilter === 'unavailable' && !book.available);
      
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }

  editBook(book: Book) {
    this.editingBook = book;
    this.bookForm = { 
      title: book.title,
      author: book.author,
      isbn: book.isbn,
      category: book.category,
      publicationYear: book.publicationYear,
      location: book.location || '',
      description: book.description || '',
      available: book.available
    };
  }

  deleteBook(id: number) {
    if (confirm('Are you sure you want to delete this book?')) {
      this.bookService.deleteBook(id);
      this.books = this.bookService.getBooks();
    }
  }

  saveBook() {
    if (this.editingBook) {
      this.bookService.updateBook(this.editingBook.id, this.bookForm);
    } else {
      this.bookService.addBook(this.bookForm);
    }
    
    this.books = this.bookService.getBooks();
    this.closeModal();
  }

  closeModal() {
    this.showAddForm = false;
    this.editingBook = null;
    this.bookForm = {
      title: '',
      author: '',
      isbn: '',
      category: '',
      publicationYear: new Date().getFullYear(),
      location: '',
      description: '',
      available: true
    };
  }
} 