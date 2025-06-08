import { Component, AfterViewInit, OnDestroy } from '@angular/core';
//declare var require: any;
import { OrganizationService } from 'src/app/services/organization.service';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements AfterViewInit, OnDestroy {
  subtitle: string;
  organizationName: string = '';
  private orgSubscription: Subscription = new Subscription();

  constructor(private organizationService: OrganizationService) {
    this.subtitle = 'This is some text within a card block.';
  }

  ngAfterViewInit() {
    this.orgSubscription = this.organizationService.getCurrentOrganization().subscribe(org => {
      if (org) {
        this.organizationName = org;
      }
    });
  }

  ngOnDestroy() {
    if (this.orgSubscription) {
      this.orgSubscription.unsubscribe();
    }
  }
}
