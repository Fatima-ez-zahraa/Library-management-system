import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="reports-page">
      <h1>Reports</h1>
      <p>View and export library statistics and activity reports.</p>
      <div class="report-section">
        <h2>Statistics</h2>
        <ul>
          <li>Total books: <strong>...</strong></li>
          <li>Total users: <strong>...</strong></li>
          <li>Total loans: <strong>...</strong></li>
        </ul>
      </div>
      <div class="report-section">
        <h2>Export</h2>
        <button class="btn-primary" disabled>Export as PDF (coming soon)</button>
        <button class="btn-primary" disabled>Export as CSV (coming soon)</button>
      </div>
    </div>
  `,
  styles: [`
    .reports-page {
      padding: 2rem;
      background: #f8f9fa;
      min-height: 100vh;
    }
    .report-section {
      margin-top: 2rem;
      background: white;
      border-radius: 10px;
      padding: 1.5rem;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    }
    .btn-primary {
      margin-right: 1rem;
      padding: 0.5rem 1.5rem;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: 600;
      cursor: not-allowed;
      opacity: 0.7;
    }
  `]
})
export class ReportsComponent {} 