import { Routes } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';

// Guards
const authGuard = () => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (!authService.isLoggedIn()) {
      router.navigate(['/login']);
      return false;
    }
    return true;
  };
};

const adminGuard = () => {
  return () => {
    const authService = inject(AuthService);
    const router = inject(Router);
    if (!authService.isLoggedIn()) {
      router.navigate(['/login']);
      return false;
    }
    if (!authService.isAdmin()) {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  };
};

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./components/layout/layout.component').then(m => m.LayoutComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'books',
        loadComponent: () => import('./pages/books/books.component').then(m => m.BooksComponent)
      },
      {
        path: 'loans',
        loadComponent: () => import('./pages/loans/loans.component').then(m => m.LoansComponent)
      },
      {
        path: 'users',
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/users/users.component').then(m => m.UsersComponent)
      },
      {
        path: 'settings',
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/settings/settings.component').then(m => m.SettingsComponent)
      },
      {
        path: 'reports',
        canActivate: [adminGuard],
        loadComponent: () => import('./pages/reports/reports.component').then(m => m.ReportsComponent)
      }
    ]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];
