import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { User } from '../../models/book.model';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="users-page">
      <div class="page-header">
        <div class="header-content">
          <h1>Users Management</h1>
          <p>Manage library users and permissions</p>
        </div>
        <button class="add-btn" (click)="showAddForm = true">
          <span class="icon">👤</span>
          Add New User
        </button>
      </div>
      
      <div class="stats-cards">
        <div class="stat-card">
          <div class="stat-icon">👥</div>
          <div class="stat-content">
            <h3>{{ totalUsers }}</h3>
            <p>Total Users</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">👑</div>
          <div class="stat-content">
            <h3>{{ adminUsers }}</h3>
            <p>Administrators</p>
          </div>
        </div>
        <div class="stat-card">
          <div class="stat-icon">📚</div>
          <div class="stat-content">
            <h3>{{ regularUsers }}</h3>
            <p>Regular Users</p>
          </div>
        </div>
      </div>
      
      <div class="users-table">
        <table>
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let user of filteredUsers" class="user-row">
              <td>
                <div class="user-avatar">{{ user.avatar || '👤' }}</div>
              </td>
              <td>
                <div class="user-name">{{ user.name }}</div>
              </td>
              <td>{{ user.email }}</td>
              <td>
                <span class="role-badge" [class.admin]="user.role === 'admin'" [class.user]="user.role === 'user'">
                  {{ user.role }}
                </span>
              </td>
              <td>
                <span class="status-badge active">Active</span>
              </td>
              <td>
                <div class="action-buttons">
                  <button class="action-btn edit" (click)="editUser(user)" title="Edit">
                    ✏️
                  </button>
                  <button class="action-btn delete" (click)="deleteUser(user.id)" title="Delete">
                    🗑️
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Add/Edit User Modal -->
      <div *ngIf="showAddForm || editingUser" class="modal-overlay" (click)="closeModal()">
        <div class="modal" (click)="$event.stopPropagation()">
          <div class="modal-header">
            <h2>{{ editingUser ? 'Edit User' : 'Add New User' }}</h2>
            <button class="close-btn" (click)="closeModal()">✕</button>
          </div>
          
          <form class="modal-form" (ngSubmit)="saveUser()">
            <div class="form-row">
              <div class="form-group">
                <label for="name">Name *</label>
                <input type="text" id="name" [(ngModel)]="userForm.name" name="name" required>
              </div>
              <div class="form-group">
                <label for="email">Email *</label>
                <input type="email" id="email" [(ngModel)]="userForm.email" name="email" required>
              </div>
            </div>
            
            <div class="form-group">
              <label for="role">Role *</label>
              <select id="role" [(ngModel)]="userForm.role" name="role" required>
                <option value="">Select Role</option>
                <option value="user">User</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
            
            <div class="form-group">
              <label for="avatar">Avatar</label>
              <input type="text" id="avatar" [(ngModel)]="userForm.avatar" name="avatar" placeholder="Emoji or URL">
            </div>
            
            <div class="form-actions">
              <button type="button" class="btn-secondary" (click)="closeModal()">Cancel</button>
              <button type="submit" class="btn-primary">{{ editingUser ? 'Update' : 'Add' }} User</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .users-page {
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

    .users-table {
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

    .user-row:hover {
      background: #f8f9fa;
    }

    .user-avatar {
      font-size: 2rem;
      width: 50px;
      height: 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      border-radius: 50%;
      color: white;
    }

    .user-name {
      font-weight: 600;
      color: #2c3e50;
    }

    .role-badge {
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .role-badge.admin {
      background: #fff3cd;
      color: #856404;
    }

    .role-badge.user {
      background: #e3f2fd;
      color: #1976d2;
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
      .users-page {
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
      
      .users-table {
        overflow-x: auto;
      }
      
      .form-row {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class UsersComponent {
  users: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'user' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'user' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@example.com', role: 'admin' },
    { id: 5, name: 'David Brown', email: 'david@example.com', role: 'user' }
  ];
  
  showAddForm = false;
  editingUser: User | null = null;
  
  userForm = {
    name: '',
    email: '',
    role: 'user' as 'admin' | 'user',
    avatar: ''
  };

  get filteredUsers() {
    return this.users;
  }

  get totalUsers() {
    return this.users.length;
  }

  get adminUsers() {
    return this.users.filter(user => user.role === 'admin').length;
  }

  get regularUsers() {
    return this.users.filter(user => user.role === 'user').length;
  }

  editUser(user: User) {
    this.editingUser = user;
    this.userForm = { 
      name: user.name,
      email: user.email,
      role: user.role,
      avatar: user.avatar || ''
    };
  }

  deleteUser(id: number) {
    if (confirm('Are you sure you want to delete this user?')) {
      this.users = this.users.filter(user => user.id !== id);
    }
  }

  saveUser() {
    if (this.editingUser) {
      const index = this.users.findIndex(u => u.id === this.editingUser!.id);
      if (index !== -1) {
        this.users[index] = { ...this.editingUser, ...this.userForm };
      }
    } else {
      const newUser = {
        ...this.userForm,
        id: Math.max(...this.users.map(u => u.id)) + 1
      };
      this.users.push(newUser);
    }
    
    this.closeModal();
  }

  closeModal() {
    this.showAddForm = false;
    this.editingUser = null;
    this.userForm = {
      name: '',
      email: '',
      role: 'user',
      avatar: ''
    };
  }
} 