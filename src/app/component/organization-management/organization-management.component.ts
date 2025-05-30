import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { OrganizationService } from '../../services/organization.service';
import { Organization, OrganizationRequest } from '../../models/organization';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupRepoDTO } from '../../models/user';

@Component({
  selector: 'app-organization-management',
  templateUrl: './organization-management.component.html',
  styleUrls: ['./organization-management.component.scss']
})
export class OrganizationManagementComponent implements OnInit {
  organizations: Organization[] = [];
  organizationForm: FormGroup;
  editingOrganization: Organization | null = null;
  selectedOrganization: Organization | null = null;
  isLoading = false;
  error = '';
  success = '';

  constructor(
    private organizationService: OrganizationService,
    private fb: FormBuilder,
    private modalService: NgbModal
  ) {
    this.organizationForm = this.fb.group({
      org_name: ['', [Validators.required]],
      org_email: ['', [Validators.required, Validators.email]],
      org_owner: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadOrganizations();
  }

  loadOrganizations(): void {
    this.isLoading = true;
    this.error = '';
    this.organizationService.getAllOrganizations().subscribe({
      next: (data) => {
        this.organizations = data;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to load organizations';
        this.isLoading = false;
        console.error('Error loading organizations:', error);
      }
    });
  }

  openModal(content: any, organization?: Organization | null): void {
    if (organization) {
      this.editingOrganization = organization;
      this.organizationForm.patchValue({
        org_name: organization.org_name,
        org_email: organization.org_email,
        org_owner: organization.org_owner
      });
    } else {
      this.editingOrganization = null;
      this.organizationForm.reset({
        org_name: '',
        org_email: '',
        org_owner: ''
      });
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit(): void {
    if (this.organizationForm.invalid) {
      this.organizationForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.success = '';

    const request: OrganizationRequest = this.organizationForm.value;

    if (this.editingOrganization) {
      this.organizationService.updateOrganization(this.editingOrganization.id, request).subscribe({
        next: () => {
          this.success = 'Organization updated successfully';
          this.loadOrganizations();
          this.modalService.dismissAll();
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message || 'Failed to update organization';
          this.isLoading = false;
          console.error('Error updating organization:', error);
        }
      });
    } else {
      this.organizationService.createOrganization(request).subscribe({
        next: () => {
          this.success = 'Organization created successfully';
          this.loadOrganizations();
          this.modalService.dismissAll();
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message || 'Failed to create organization';
          this.isLoading = false;
          console.error('Error creating organization:', error);
        }
      });
    }
  }

  deleteOrganization(organization: Organization): void {
    if (confirm(`Are you sure you want to delete ${organization.org_name}?`)) {
      this.isLoading = true;
      this.organizationService.deleteOrganization(organization.id).subscribe({
        next: () => {
          this.success = 'Organization deleted successfully';
          this.loadOrganizations();
          this.isLoading = false;
        },
        error: (error) => {
          this.error = error.message || 'Failed to delete organization';
          this.isLoading = false;
          console.error('Error deleting organization:', error);
        }
      });
    }
  }

  assignToClassRoom(organization: Organization, classRoomId: number): void {
    this.isLoading = true;
    this.organizationService.assignToClassRoom(organization.id, classRoomId).subscribe({
      next: () => {
        this.success = `Assigned ${organization.org_name} to classroom`;
        this.loadOrganizations();
        this.isLoading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to assign classroom';
        this.isLoading = false;
        console.error('Error assigning classroom:', error);
      }
    });
  }

  openDetailsModal(content: any, organization: Organization): void {
    this.selectedOrganization = organization;
    this.modalService.open(content, { size: 'lg', ariaLabelledBy: 'modal-details-title' });
  }

  editGroup(group: GroupRepoDTO): void {
    // TODO: Implement group editing functionality
    console.log('Edit group:', group);
  }

  deleteGroup(group: GroupRepoDTO): void {
    if (!group || !group.group_name) {
      console.error('Invalid group data:', group);
      return;
    }

    if (confirm(`Are you sure you want to delete the group "${group.group_name}"?`)) {
      this.isLoading = true;
      // TODO: Implement group deletion functionality
      console.log('Delete group:', group);
      this.isLoading = false;
    }
  }
}