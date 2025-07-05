import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";
import { NgApexchartsModule } from "ng-apexcharts";
import { DashboardComponent } from "./dashboard.component";
import { ContributionChartComponent } from "./dashboard-components/contributions-chart/contribution-chat-component";
import { FeedsComponent } from "./dashboard-components/feeds/feeds.component";
import { TopContributionComponent } from "./dashboard-components/top-contributions/top-contributions.component";
import { TopCardsComponent } from "./dashboard-components/top-cards/top-cards.component";
import { EventsCardsComponent } from "./dashboard-components/events-cards/events-cards.component";
import { OrganizationHeaderComponent } from "../shared/header/organization-header.component";
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Chatbot',
      urls: [{ title: 'Chatbot', url: '/chatbot' }, { title: 'Chatbot' }],
    },
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    DashboardComponent,
    ContributionChartComponent,
    FeedsComponent,
    TopContributionComponent,
    TopCardsComponent,
    EventsCardsComponent,
    OrganizationHeaderComponent
  ],
  exports: [
  ]
})
export class DashboardModule {}