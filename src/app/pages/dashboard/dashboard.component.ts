import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookService } from '../../services/book.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="dashboard">
      <div class="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome back, {{ authService.getCurrentUser()?.name }}!</p>
      </div>
      
      <div class="stats-grid">
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-content">
            <h3>{{ totalBooks }}</h3>
            <p>Total Books</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">✅</div>
          <div class="stat-content">
            <h3>{{ availableBooks }}</h3>
            <p>Available Books</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">📋</div>
          <div class="stat-content">
            <h3>{{ totalLoans }}</h3>
            <p>Active Loans</p>
          </div>
        </div>
        
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <h3>{{ totalUsers }}</h3>
            <p>Registered Users</p>
          </div>
        </div>
      </div>
      
      <div class="dashboard-content">
        <div class="content-grid">
          <div class="content-card">
            <h2>Recent Books</h2>
            <div class="book-list">
              <div *ngFor="let book of recentBooks" class="book-item">
                <div class="book-cover">
                  📖
                </div>
                <div class="book-info">
                  <h4>{{ book.title }}</h4>
                  <p>{{ book.author }}</p>
                  <span class="book-status" [class.available]="book.available" [class.unavailable]="!book.available">
                    {{ book.available ? 'Available' : 'Borrowed' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="content-card">
            <h2>Recent Activity</h2>
            <div class="activity-list">
              <div class="activity-item">
                <div class="activity-icon">📖</div>
                <div class="activity-content">
                  <p><strong>Book borrowed:</strong> The Great Gatsby</p>
                  <span class="activity-time">2 hours ago</span>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon">✅</div>
                <div class="activity-content">
                  <p><strong>Book returned:</strong> To Kill a Mockingbird</p>
                  <span class="activity-time">1 day ago</span>
                </div>
              </div>
              <div class="activity-item">
                <div class="activity-icon">👤</div>
                <div class="activity-content">
                  <p><strong>New user registered:</strong> Jane Smith</p>
                  <span class="activity-time">2 days ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard {
      padding: 2rem;
      background: #f8f9fa;
      min-height: 100vh;
    }

    .dashboard-header {
      margin-bottom: 2rem;
    }

    .dashboard-header h1 {
      font-size: 2.5rem;
      font-weight: bold;
      color: #2c3e50;
      margin: 0 0 0.5rem 0;
    }

    .dashboard-header p {
      color: #7f8c8d;
      font-size: 1.1rem;
      margin: 0;
    }

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
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
      font-size: 2.5rem;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 12px;
      color: white;
    }

    .stat-content h3 {
      font-size: 2rem;
      font-weight: bold;
      color: #2c3e50;
      margin: 0 0 0.25rem 0;
    }

    .stat-content p {
      color: #7f8c8d;
      margin: 0;
      font-weight: 500;
    }

    .dashboard-content {
      margin-top: 2rem;
    }

    .content-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
      gap: 2rem;
    }

    .content-card {
      background: white;
      border-radius: 15px;
      padding: 1.5rem;
      box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    .content-card h2 {
      font-size: 1.5rem;
      font-weight: bold;
      color: #2c3e50;
      margin: 0 0 1.5rem 0;
      border-bottom: 2px solid #ecf0f1;
      padding-bottom: 0.5rem;
    }

    .book-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .book-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 10px;
      background: #f8f9fa;
      transition: all 0.3s ease;
    }

    .book-item:hover {
      background: #e9ecef;
      transform: translateX(5px);
    }

    .book-cover {
      font-size: 2rem;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 8px;
      color: white;
    }

    .book-info {
      flex: 1;
    }

    .book-info h4 {
      font-size: 1rem;
      font-weight: 600;
      color: #2c3e50;
      margin: 0 0 0.25rem 0;
    }

    .book-info p {
      color: #7f8c8d;
      margin: 0 0 0.5rem 0;
      font-size: 0.9rem;
    }

    .book-status {
      font-size: 0.8rem;
      font-weight: 600;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      text-transform: uppercase;
    }

    .book-status.available {
      background: #d4edda;
      color: #155724;
    }

    .book-status.unavailable {
      background: #f8d7da;
      color: #721c24;
    }

    .activity-list {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .activity-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border-radius: 10px;
      background: #f8f9fa;
      transition: all 0.3s ease;
    }

    .activity-item:hover {
      background: #e9ecef;
    }

    .activity-icon {
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

    .activity-content {
      flex: 1;
    }

    .activity-content p {
      margin: 0 0 0.25rem 0;
      color: #2c3e50;
    }

    .activity-time {
      font-size: 0.8rem;
      color: #7f8c8d;
    }

    @media (max-width: 768px) {
      .dashboard {
        padding: 1rem;
      }
      
      .stats-grid {
        grid-template-columns: 1fr;
      }
      
      .content-grid {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class DashboardComponent {
  bookService = inject(BookService);
  authService = inject(AuthService);

  get totalBooks() {
    return this.bookService.getBooks().length;
  }

  get availableBooks() {
    return this.bookService.getBooks().filter(book => book.available).length;
  }

  get totalLoans() {
    return this.bookService.getLoans().filter(loan => !loan.returned).length;
  }

  get totalUsers() {
    return 25; // Simulé
  }

  get recentBooks() {
    return this.bookService.getBooks().slice(0, 5);
  }
} 