import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { Loan, Book } from '../../models/book.model';

@Component({
  selector: 'app-loans',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="loans-page">
      <div class="page-header">
        <div class="header-content">
          <h1>Loans Management</h1>
          <p>Track and manage book loans</p>
        </div>
        <button class="add-btn" (click)="showAddForm = true">
          <span class="icon">📖</span>
          New Loan
        </button>
      </div>
      
      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-icon">📋</div>
          <div class="stat-content">
            <h3>{{ activeLoans }}</h3>
            <p>Active Loans</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <h3>{{ returnedLoans }}</h3>
            <p>Returned</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">⚠️</div>
          <div class="stat-content">
            <h3>{{ overdueLoans }}</h3>
            <p>Overdue</p>
          </div>
        </div>
      </div>
      
      <div class="loans-table">
        <table>
          <thead>
            <tr>
              <th>Book</th>
              <th>Borrower</th>
              <th>Loan Date</th>
              <th>Return Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let loan of loansWithDetails" class="loan-row" [class.overdue]="isOverdue(loan)">
              <td>
                <div class="book-info">
                  <div class="book-cover">
                    📖
                  </div>
                  <div class="book-details">
                    <div class="book-title">{{ getBookTitle(loan.bookId) }}</div>
                    <div class="book-author">{{ getBookAuthor(loan.bookId) }}</div>
                  </div>
                </div>
              </td>
              <td>
                <div class="user-info">
                  <div class="user-avatar">👤</div>
                  <div class="user-name">User {{ loan.userId }}</div>
                </div>
              </td>
              <td>{{ formatDate(loan.loanDate) }}</td>
              <td>
                <span [class.overdue]="isOverdue(loan)">{{ formatDate(loan.returnDate) }}</span>
              </td>
              <td>
                <span class="status-badge" [class.returned]="loan.returned" [class.active]="!loan.returned" [class.overdue]="isOverdue(loan)">
                  {{ getStatusText(loan) }}
                </span>
              </td>
              <td>
                <div class="action-buttons">
                  <button *ngIf="!loan.returned" class="action-btn return" (click)="returnBook(loan.id)" title="Return Book">
                    ✅
                  </button>
                  <button class="action-btn view" (click)="viewLoanDetails(loan)" title="View Details">
                    👁️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- New Loan Modal -->
      <div *ngIf="showAddForm" class="modal-overlay" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>Create New Loan</h2>
            <button class="close-btn" (click)="closeModal()">✕</button>
          </div>
          
          <form class="modal-form" (ngSubmit)="createLoan()">
            <div class="form-group">
              <label for="bookId">Book *</label>
              <select id="bookId" [(ngModel)]="loanForm.bookId" name="bookId" required>
                <option value="">Select a book</option>
                <option *ngFor="let book of availableBooks" [value]="book.id">
                  {{ book.title }} by {{ book.author }}
                </option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="userId">Borrower *</label>
              <select id="userId" [(ngModel)]="loanForm.userId" name="userId" required>
                <option value="">Select a user</option>
                <option value="1">John Doe</option>
                <option value="2">Jane Smith</option>
                <option value="3">Mike Johnson</option>
              </select>
            </div>
            
            <div class="form-row">
              <div class="form-group">
                <label for="loanDate">Loan Date *</label>
                <input type="date" id="loanDate" [(ngModel)]="loanForm.loanDate" name="loanDate" required>
              </div>
              <div class="form-group">
                <label for="returnDate">Return Date *</label>
                <input type="date" id="returnDate" [(ngModel)]="loanForm.returnDate" name="returnDate" required>
              </div>
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn-primary">Create Loan</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .loans-page {
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

    .stats-cards {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1.5rem;
      margin-bottom: 2rem;
    }

    .stat-card {
      background: white;
      border-radius: 15px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: all 0.3s ease;
    }

    .stat-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
    }

    .stat-icon {
      font-size: 2rem;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 10px;
      color: white;
    }

    .stat-content h3 {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2c3e50;
      margin: 0 0 0.25rem 0;
    }

    .stat-content p {
      color: #7f8c8d;
      margin: 0;
      font-weight: 500;
    }

    .loans-table {
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

    .loan-row:hover {
      background: #f8f9fa;
    }

    .loan-row.overdue {
      background: #fff5f5;
    }

    .book-info {
      display: flex;
      align-items: center;
      gap: 1rem;
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
      margin-bottom: 0.25rem;
    }

    .book-author {
      color: #7f8c8d;
      font-size: 0.9rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .user-avatar {
      font-size: 1.25rem;
      width: 35px;
      height: 35px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #ecf0f1;
      border-radius: 50%;
      color: #7f8c8d;
    }

    .user-name {
      font-weight: 500;
      color: #2c3e50;
    }

    .status-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-badge.active {
      background: #d4edda;
      color: #155724;
    }

    .status-badge.returned {
      background: #e2e3e5;
      color: #6c757d;
    }

    .status-badge.overdue {
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

    .action-btn.return {
      background: #d4edda;
      color: #155724;
    }

    .action-btn.return:hover {
      background: #c3e6cb;
    }

    .action-btn.view {
      background: #e3f2fd;
      color: #1976d2;
    }

    .action-btn.view:hover {
      background: #bbdefb;
    }

    .overdue {
      color: #dc3545;
      font-weight: 600;
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
      max-width: 500px;
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
    .form-group select {
      width: 100%;
      padding: 0.75rem;
      border: 2px solid #ecf0f1;
      border-radius: 8px;
      font-size: 1rem;
      transition: all 0.3s ease;
      box-sizing: border-box;
    }

    .form-group input:focus,
    .form-group select:focus {
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
      .loans-page {
        padding: 1rem;
      }
      
      .page-header {
        flex-direction: column;
        gap: 1rem;
        align-items: stretch;
      }
      
      .stats-cards {
        grid-template-columns: 1fr;
      }
      
      .loans-table {
        overflow-x: auto;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class LoansComponent {
  bookService = inject(BookService);
  
  loans = this.bookService.getLoans();
  books = this.bookService.getBooks();
  showAddForm = false;
  
  loanForm = {
    bookId: 0,
    userId: 0,
    loanDate: new Date().toISOString().split('T')[0],
    returnDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  };

  get loansWithDetails() {
    return this.loans.map(loan => ({
      ...loan,
      book: this.books.find(b => b.id === loan.bookId)
    }));
  }

  get activeLoans() {
    return this.loans.filter(loan => !loan.returned).length;
  }

  get returnedLoans() {
    return this.loans.filter(loan => loan.returned).length;
  }

  get overdueLoans() {
    return this.loans.filter(loan => this.isOverdue(loan)).length;
  }

  get availableBooks() {
    return this.books.filter(book => book.available);
  }

  getBookTitle(bookId: number): string {
    const book = this.books.find(b => b.id === bookId);
    return book ? book.title : 'Unknown Book';
  }

  getBookAuthor(bookId: number): string {
    const book = this.books.find(b => b.id === bookId);
    return book ? book.author : 'Unknown Author';
  }

  formatDate(date: Date): string {
    return new Date(date).toLocaleDateString();
  }

  isOverdue(loan: Loan): boolean {
    if (loan.returned) return false;
    return new Date(loan.returnDate) < new Date();
  }

  getStatusText(loan: Loan): string {
    if (loan.returned) return 'Returned';
    if (this.isOverdue(loan)) return 'Overdue';
    return 'Active';
  }

  returnBook(loanId: number) {
    if (confirm('Confirm book return?')) {
      this.bookService.returnBook(loanId);
      this.loans = this.bookService.getLoans();
    }
  }

  viewLoanDetails(loan: Loan) {
    // Implement loan details view
    alert(`Loan Details:\nBook: ${this.getBookTitle(loan.bookId)}\nBorrower: User ${loan.userId}\nLoan Date: ${this.formatDate(loan.loanDate)}\nReturn Date: ${this.formatDate(loan.returnDate)}`);
  }

  createLoan() {
    if (this.loanForm.bookId && this.loanForm.userId) {
      this.bookService.addLoan({
        bookId: this.loanForm.bookId,
        userId: this.loanForm.userId,
        loanDate: new Date(this.loanForm.loanDate),
        returnDate: new Date(this.loanForm.returnDate),
        returned: false
      });
      
      this.loans = this.bookService.getLoans();
      this.closeModal();
    }
  }

  closeModal() {
    this.showAddForm = false;
    this.loanForm = {
      bookId: 0,
      userId: 0,
      loanDate: new Date().toISOString().split('T')[0],
      returnDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
  }
} 