import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="login-container">
      <div class="login-card">
        <div class="login-header">
          <div class="logo">
            <h1>LibraryMS</h1>
          </div>
          <p class="subtitle">Welcome back! Please sign in to your account.</p>
        </div>
        
        <form class="login-form" (ngSubmit)="onLogin()">
          <div class="form-group">
            <label for="email">Email</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              [(ngModel)]="email" 
              placeholder="Enter your email"
              required
            >
          </div>
          
          <div class="form-group">
            <label for="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              [(ngModel)]="password" 
              placeholder="Enter your password"
              required
            >
          </div>
          
          <div class="form-options">
            <label class="checkbox">
              <input type="checkbox" [(ngModel)]="rememberMe">
              <span class="checkmark"></span>
              Remember me
            </label>
            <a href="#" class="forgot-password">Forgot password?</a>
          </div>
          
          <button type="submit" class="login-btn" [disabled]="isLoading">
            <span *ngIf="isLoading" class="spinner">⏳</span>
            <span *ngIf="!isLoading">Sign In</span>
          </button>
        </form>
        
        <div class="login-footer">
          <p>Don't have an account? <a href="#" class="signup-link">Sign up</a></p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .login-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: #f0f2f5;
    }
    .login-card {
      background: white;
      border-radius: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.1);
      padding: 2rem;
      width: 90%;
      max-width: 400px;
    }
    .login-header {
      text-align: center;
      margin-bottom: 2rem;
    }
    .logo h1 {
      color: #4f46e5;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: #6b7280;
      font-size: 1rem;
    }
    .login-form .form-group {
      margin-bottom: 1.5rem;
    }
    .login-form label {
      display: block;
      margin-bottom: 0.5rem;
      color: #374151;
      font-weight: 500;
    }
    .login-form input {
      width: 100%;
      padding: 0.8rem 1rem;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      font-size: 1rem;
      transition: border-color 0.2s ease-in-out;
    }
    .login-form input:focus {
      outline: none;
      border-color: #4f46e5;
    }
    .login-form .form-options {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1.5rem;
    }
    .login-form .checkbox {
      display: flex;
      align-items: center;
      cursor: pointer;
      font-size: 0.9rem;
      color: #4b5563;
    }
    .login-form .checkmark {
      height: 1.2rem;
      width: 1.2rem;
      background-color: #fff;
      border: 1px solid #d1d5db;
      border-radius: 4px;
      margin-right: 0.5rem;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .login-form .checkbox input:checked ~ .checkmark {
      background-color: #4f46e5;
      border-color: #4f46e5;
    }
    .login-form .checkbox input:checked ~ .checkmark:after {
      content: "";
      display: block;
      width: 0.5rem;
      height: 1rem;
      border: solid white;
      border-width: 0 2px 2px 0;
      transform: rotate(45deg);
    }
    .login-form .forgot-password {
      float: right;
      color: #4f46e5;
      font-size: 0.9rem;
      text-decoration: none;
    }
    .login-form .forgot-password:hover {
      text-decoration: underline;
    }
    .login-btn {
      width: 100%;
      padding: 0.8rem 1rem;
      background: #4f46e5;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 1rem;
      font-weight: 600;
      cursor: pointer;
      transition: background-color 0.2s ease-in-out;
    }
    .login-btn:hover {
      background: #3b2ecc;
    }
    .login-btn:disabled {
      background: #a5a5a5;
      cursor: not-allowed;
      opacity: 0.7;
    }
    .login-footer {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.9rem;
      color: #6b7280;
    }
    .login-footer .signup-link {
      color: #4f46e5;
      text-decoration: none;
    }
    .login-footer .signup-link:hover {
      text-decoration: underline;
    }
    .spinner {
      animation: spin 1s linear infinite;
    }
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false;
  isLoading = false;
  
  authService = inject(AuthService);
  router = inject(Router);

  onLogin() {
    this.isLoading = true;
    setTimeout(() => {
      // Demo: accept any login
      const user = {
        id: 1,
        name: 'John Doe',
        email: this.email,
        role: this.email.includes('admin') ? 'admin' as const : 'user' as const
      };
      this.authService.login(user);
      this.router.navigate(['/dashboard']);
      this.isLoading = false;
    }, 1000);
  }
}