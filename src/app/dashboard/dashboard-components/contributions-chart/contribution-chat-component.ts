import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { CommitService } from 'src/app/services/commit.service';
import { OrganizationService } from 'src/app/services/organization.service';
import { Subscription, forkJoin } from 'rxjs';
import {
  ApexAxisChartSeries,
  ApexChart,
  ChartComponent,
  ApexDataLabels,
  ApexYAxis,
  ApexLegend,
  ApexXAxis,
  ApexTooltip,
  ApexTheme,
  ApexGrid
} from 'ng-apexcharts';

export type SalesChartOptions = {
  series: ApexAxisChartSeries | any;
  chart: ApexChart | any;
  xaxis: ApexXAxis | any;
  yaxis: ApexYAxis | any;
  stroke: any;
  theme: ApexTheme | any;
  tooltip: ApexTooltip | any;
  dataLabels: ApexDataLabels | any;
  legend: ApexLegend | any;
  colors: string[] | any;
  markers: any;
  grid: ApexGrid | any;
};

@Component({
  selector: 'app-sales-ratio',
  templateUrl: '../../dashboard-components/contributions-chart/contribution-chat-component.html',
})
export class ContributionChartComponent implements OnInit, OnDestroy {
  @ViewChild("chart") chart: ChartComponent = Object.create(null);

  public salesChartOptions: Partial<SalesChartOptions>;
  public startDate: string = '';
  public endDate: string = '';
  public selectedCollaborators: string[] = [];
  public isLoading: boolean = false;
  public collaborators: string[] = [
    'badisjl99', 'Farah-Saad1', 'scriptsl0th', '=walidbechri', 'smiriaziz21', 'FetenDridi'
  ];

  private orgSubscription: Subscription = new Subscription();
  private currentOrganization: string = '';

  constructor(
    private commitService: CommitService,
    private organizationService: OrganizationService
  ) {
    this.salesChartOptions = {
      series: [],
      chart: {
        fontFamily: 'Rubik,sans-serif',
        height: 400,
        type: 'line',
        toolbar: { show: true },
        zoom: { enabled: true }
      },
      dataLabels: {
        enabled: true,
        formatter: (val: number) => val.toString(),
      },
      colors: ["#137eff", "#6c757d", "#ff5733", "#28a745", "#ffc107", "#6f42c1"],
      stroke: { curve: 'smooth', width: 3 },
      grid: { strokeDashArray: 3 },
      markers: { size: 4, hover: { size: 6 } },
      xaxis: {
        categories: [],
        title: { text: 'Date' }
      },
      yaxis: {
        title: { text: 'Number of Commits' },
        min: 0,
        forceNiceScale: true,
        labels: {
          formatter: (val: number) => Math.round(val).toString(),
        }
      },
      tooltip: {
        theme: 'dark',
        shared: true,
        intersect: false,
        y: {
          formatter: (val: number) => Math.round(val).toString() + " commits",
        }
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }

  ngOnInit(): void {
    // Default date range: last 30 days
    const today = new Date();
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(today.getDate() - 30);

    this.startDate = this.formatDate(thirtyDaysAgo);
    this.endDate = this.formatDate(today);
    this.selectedCollaborators = [this.collaborators[0]];

    // Subscribe to organization changes
    this.orgSubscription = this.organizationService.getCurrentOrganization().subscribe(org => {
      if (org && org.trim()) {
        this.currentOrganization = org;
        this.fetchData();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.orgSubscription) {
      this.orgSubscription.unsubscribe();
    }
  }

  formatDate(date: Date): string {
    return date.toISOString().split('T')[0];
  }

  toggleCollaborator(collaborator: string): void {
    const index = this.selectedCollaborators.indexOf(collaborator);
    if (index === -1) {
      this.selectedCollaborators.push(collaborator);
    } else {
      this.selectedCollaborators.splice(index, 1);
    }
  }

  isSelected(collaborator: string): boolean {
    return this.selectedCollaborators.includes(collaborator);
  }

  fetchData(): void {
    if (this.selectedCollaborators.length === 0) {
      alert('Please select at least one collaborator');
      return;
    }

    if (!this.currentOrganization) {
      console.warn('Organization not selected');
      return;
    }

    this.isLoading = true;

    const requests = this.selectedCollaborators.map(collaborator =>
      this.commitService.getCommits(this.startDate, this.endDate, collaborator, this.currentOrganization)
    );

    const allDates = new Set<string>();
    const collaboratorData: { [key: string]: { [date: string]: number } } = {};

    forkJoin(requests).subscribe({
      next: (responses) => {
        responses.forEach((data, index) => {
          const collaborator = this.selectedCollaborators[index];
          collaboratorData[collaborator] = data;
          Object.keys(data).forEach(date => allDates.add(date));
        });

        const sortedDates = Array.from(allDates).sort();
        const series = this.selectedCollaborators.map(collaborator => ({
          name: collaborator,
          data: sortedDates.map(date => collaboratorData[collaborator][date] || 0)
        }));

        this.salesChartOptions.series = series;
        this.salesChartOptions.xaxis.categories = sortedDates;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching commit data:', error);
        this.isLoading = false;
      }
    });
  }
}
