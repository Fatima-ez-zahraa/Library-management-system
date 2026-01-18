import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="settings-container">
      <h2>Settings</h2>
      <div class="settings-content">
        <p>Manage your application preferences and account settings here.</p>
        <!-- Example settings form -->
        <form>
          <div class="form-group">
            <label for="language">Language</label>
            <select id="language" name="language">
              <option value="en">English</option>
              <option value="fr">Français</option>
            </select>
          </div>
          <div class="form-group">
            <label for="theme">Theme</label>
            <select id="theme" name="theme">
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
          <button type="submit">Save Changes</button>
        </form>
      </div>
    </section>
  `,
  styles: [`
    .settings-container {
      max-width: 500px;
      margin: 2rem auto;
      padding: 2rem;
      background: #fff;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.07);
    }
    .settings-content {
      margin-top: 1rem;
    }
    .form-group {
      margin-bottom: 1.5rem;
    }
    label {
      display: block;
      margin-bottom: 0.5rem;
      font-weight: 500;
    }
    select {
      width: 100%;
      padding: 0.5rem;
      border-radius: 4px;
      border: 1px solid #ccc;
    }
    button[type="submit"] {
      background: #1976d2;
      color: #fff;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 4px;
      cursor: pointer;
      font-size: 1rem;
      transition: background 0.2s;
    }
    button[type="submit"]:hover {
      background: #1565c0;
    }
  `]
})
export class SettingsComponent {} 