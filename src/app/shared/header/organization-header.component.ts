import { Component, OnInit } from '@angular/core';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-organization-header',
  template: `
    <div class="organization-header" *ngIf="currentOrganization">
      <h2 class="org-title">{{ currentOrganization }}</h2>
      <div class="organization-stats">
        <span class="badge org-badge">Active Organization</span>
        <small class="last-updated">Last updated: {{ lastUpdated | date:'medium' }}</small>
      </div>
    </div>
  `,
  styles: [`
    .organization-header {
      padding: 2rem 1.5rem;
      background: linear-gradient(90deg, #f8fafc 0%, #e0e7ef 100%);
      border-bottom: 2px solid #d1d5db;
      margin-bottom: 2rem;
      border-radius: 0 0 12px 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.03);
      transition: box-shadow 0.2s;
    }
    .organization-header:hover {
      box-shadow: 0 4px 16px rgba(0,0,0,0.07);
    }
    .org-title {
      margin: 0;
      font-size: 2rem;
      font-weight: 700;
      color: #1e293b;
      letter-spacing: 0.5px;
    }
    .organization-stats {
      margin-top: 0.75rem;
      display: flex;
      align-items: center;
      gap: 1rem;
    }
    .org-badge {
      background: #2563eb;
      color: #fff;
      padding: 0.35em 1em;
      border-radius: 999px;
      font-size: 0.95em;
      font-weight: 500;
      box-shadow: 0 1px 4px rgba(37,99,235,0.08);
    }
    .last-updated {
      color: #64748b;
      font-size: 0.95em;
    }
  `]
})
export class OrganizationHeaderComponent implements OnInit {
  currentOrganization: string = '';
  lastUpdated: Date = new Date();

  constructor(private organizationService: OrganizationService) {}

  ngOnInit() {
    this.organizationService.getCurrentOrganization().subscribe(org => {
      this.currentOrganization = org;
      this.lastUpdated = new Date();
    });
  }
}