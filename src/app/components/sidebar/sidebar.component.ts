import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sidebar">
      <div class="sidebar-header">
        <div class="logo">
          <img src="/logo-.png" alt="Logo" class="logo-icon" style="height:40px; width:auto;" />
        </div>
      </div>
      
      <nav class="sidebar-nav">
        <div class="nav-section">
          <h3 class="nav-title">Main Menu</h3>
          <a routerLink="/dashboard" class="nav-item" routerLinkActive="active">
            <span class="nav-icon">🏠</span>
            <span class="nav-text">Dashboard</span>
          </a>
          <a routerLink="/books" class="nav-item" routerLinkActive="active">
            <span class="nav-icon">📖</span>
            <span class="nav-text">Books</span>
          </a>
          <a routerLink="/loans" class="nav-item" routerLinkActive="active">
            <span class="nav-icon">📋</span>
            <span class="nav-text">Loans</span>
          </a>
        </div>
        
        <div *ngIf="authService.isAdmin()" class="nav-section">
          <h3 class="nav-title">Administration</h3>
          <a routerLink="/users" class="nav-item" routerLinkActive="active">
            <span class="nav-icon">👥</span>
            <span class="nav-text">Users</span>
          </a>
          <a routerLink="/reports" class="nav-item" routerLinkActive="active">
            <span class="nav-icon">📊</span>
            <span class="nav-text">Reports</span>
          </a>
          <a routerLink="/settings" class="nav-item" routerLinkActive="active">
            <span class="nav-icon">⚙️</span>
            <span class="nav-text">Settings</span>
          </a>
        </div>
      </nav>
      
      <div class="sidebar-footer">
        <div class="user-profile">
          <div class="user-avatar">👤</div>
          <div class="user-details">
            <div class="user-name">{{ authService.getCurrentUser()?.name }}</div>
            <div class="user-role">{{ authService.getCurrentUser()?.role }}</div>
          </div>
        </div>
        <button class="logout-btn" (click)="logout()">
          <span class="logout-icon">🚪</span>
          <span>Logout</span>
        </button>
      </div>
    </div>
  `,
  styles: [`
    .sidebar {
      width: 280px;
      height: 100vh;
      background: linear-gradient(180deg, #2c3e50 0%, #34495e 100%);
      color: white;
      display: flex;
      flex-direction: column;
      position: fixed;
      left: 0;
      top: 0;
      box-shadow: 2px 0 10px rgba(0,0,0,0.1);
    }

    .sidebar-header {
      padding: 2rem 1.5rem;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .logo {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .logo-icon {
      font-size: 2rem;
    }

    .logo-text {
      font-size: 1.5rem;
      font-weight: bold;
    }

    .sidebar-nav {
      flex: 1;
      padding: 1.5rem 0;
    }

    .nav-section {
      margin-bottom: 2rem;
    }

    .nav-title {
      font-size: 0.875rem;
      font-weight: 600;
      color: rgba(255,255,255,0.7);
      margin: 0 1.5rem 1rem;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .nav-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 0.75rem 1.5rem;
      color: rgba(255,255,255,0.8);
      text-decoration: none;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }

    .nav-item:hover {
      background: rgba(255,255,255,0.1);
      color: white;
      border-left-color: #3498db;
    }

    .nav-item.active {
      background: rgba(52, 152, 219, 0.2);
      color: white;
      border-left-color: #3498db;
    }

    .nav-icon {
      font-size: 1.25rem;
      width: 20px;
      text-align: center;
    }

    .nav-text {
      font-weight: 500;
    }

    .sidebar-footer {
      padding: 1.5rem;
      border-top: 1px solid rgba(255,255,255,0.1);
    }

    .user-profile {
      display: flex;
      align-items: center;
      gap: 1rem;
      margin-bottom: 1rem;
    }

    .user-avatar {
      font-size: 2rem;
    }

    .user-details {
      flex: 1;
    }

    .user-name {
      font-weight: 600;
      font-size: 0.9rem;
    }

    .user-role {
      font-size: 0.8rem;
      color: rgba(255,255,255,0.7);
      text-transform: capitalize;
    }

    .logout-btn {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      background: rgba(231, 76, 60, 0.8);
      border: none;
      color: white;
      padding: 0.75rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 500;
    }

    .logout-btn:hover {
      background: rgba(231, 76, 60, 1);
      transform: translateY(-2px);
    }

    .logout-icon {
      font-size: 1.1rem;
    }
  `]
})
export class SidebarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 