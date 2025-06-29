// src/app/app.component.ts

import { Component, OnInit } from '@angular/core';
import {OrganizationService} from "./services/organization.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit { // <-- 1. Implement OnInit
  title = 'app';

  // --- 2. Inject the OrganizationService in the constructor ---
  constructor(private organizationService: OrganizationService) {}

  // --- 3. Add the ngOnInit method to fetch data on startup ---
  ngOnInit(): void {
    console.log('[AppComponent] Initializing...');

    // This code will run once when the application starts
    this.organizationService.getOrganizations().subscribe({
      next: (organizations) => {
        // This will log: ["CodeSync101"] in your browser's console
        console.log('[AppComponent] Fetched organizations:', organizations);

        // If the list is not empty, set the first one as the current organization
        if (organizations && organizations.length > 0) {
          const firstOrg = organizations[0];
          console.log('[AppComponent] Setting current organization to:', firstOrg);

          // This is the CRUCIAL call that makes everything else work
          this.organizationService.setCurrentOrganization(firstOrg);
        } else {
          console.warn('[AppComponent] No organizations were found from the API.');
        }
      },
      error: (err) => {
        console.error('[AppComponent] CRITICAL ERROR: Could not fetch organizations.', err);
      }
    });
  }
}
