import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { User } from '../models/book.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  private isAuthenticated = signal(false);
  private platformId = inject(PLATFORM_ID);

  constructor() {
    // Only simulate login in browser environment
    if (isPlatformBrowser(this.platformId)) {
      this.login({
        id: 1,
        name: 'Fatimaezzahraa Bendriss',
        email: 'fz@gmail.com',
        role: 'admin'
      });
    }
  }

  login(user: User, token?: string) {
    this.currentUser.set(user);
    this.isAuthenticated.set(true);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('currentUser', JSON.stringify(user)); 
      if (token) {
        localStorage.setItem('token', token);
      }
    }
  }

  logout() {
    this.currentUser.set(null);
    this.isAuthenticated.set(false);
    
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('currentUser');
      localStorage.removeItem('token');
    }
  }

  getCurrentUser() {
    return this.currentUser();
  }

  isLoggedIn() {
    return this.isAuthenticated();
  }

  isAdmin() {
    return this.currentUser()?.role === 'admin';
  }
} 