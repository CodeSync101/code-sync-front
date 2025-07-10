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
import { CommitFrequencyComponent } from "./dashboard-components/commit-frequency/commit-frequency.component";
import { TopRepositoriesComponent } from "./dashboard-components/top-repositories/top-repositories.component";

const routes: Routes = [
  {
    path: "",
    data: {
      title: "Dashboard",
      urls: [{ title: "Dashboard", url: "/dashboard" }, { title: "Dashboard" }],
    },
    component: DashboardComponent,
  },
];

@NgModule({
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule.forChild(routes),
    NgApexchartsModule,
  ],
  declarations: [
    DashboardComponent,
    ContributionChartComponent,
    FeedsComponent,
    TopContributionComponent,
    TopCardsComponent,
    EventsCardsComponent,
    OrganizationHeaderComponent,
    CommitFrequencyComponent,
    TopRepositoriesComponent
  ],
})
export class DashboardModule {}
