import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule],
  template: `
    <nav class="navbar">
      <div class="navbar-brand">
        <span style="font-size: 1.5rem; font-weight: bold; color: white; display: block;">📚 LMS</span>
      </div>
      
      <div class="navbar-menu">
        <a routerLink="/dashboard" class="nav-link" routerLinkActive="active">
          <span class="icon">🏠</span>
          Dashboard
        </a>
        <a routerLink="/books" class="nav-link" routerLinkActive="active">
          <span class="icon">📖</span>
          Books
        </a>
        <a routerLink="/loans" class="nav-link" routerLinkActive="active">
          <span class="icon">📋</span>
          Loans
        </a>
        <a *ngIf="authService.isAdmin()" routerLink="/users" class="nav-link" routerLinkActive="active">
          <span class="icon">👥</span>
          Users
        </a>
      </div>
      
      <div class="navbar-user">
        <div class="user-info">
          <span class="user-avatar">👤</span>
          <span class="user-name">{{ authService.getCurrentUser()?.name }}</span>
        </div>
        <button class="logout-btn" (click)="logout()">
          <span class="icon">🚪</span>
          Logout
        </button>
      </div>
    </nav>
  `,
  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
    }

    .navbar-brand .logo {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0;
      color: white;
    }

    .logo {
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0;
      color: white;
    }

    .navbar-menu {
      display: flex;
      gap: 2rem;
    }

    .nav-link {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .nav-link:hover {
      background: rgba(255,255,255,0.1);
      transform: translateY(-2px);
    }

    .nav-link.active {
      background: rgba(255,255,255,0.2);
      font-weight: bold;
    }

    .icon {
      font-size: 1.2rem;
    }

    .navbar-user {
      display: flex;
      align-items: center;
      gap: 1rem;
    }

    .user-info {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .user-avatar {
      font-size: 1.5rem;
    }

    .user-name {
      font-weight: 500;
    }

    .logout-btn {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: rgba(255,255,255,0.1);
      border: none;
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .logout-btn:hover {
      background: rgba(255,255,255,0.2);
      transform: translateY(-2px);
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);
  router = inject(Router);

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
} 