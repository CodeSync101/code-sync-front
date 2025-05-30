import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RepositoryService } from './repository.service';
import { OrganizationService } from '../../services/organization.service';
import { GroupRepoDTO } from '../../models/user';
import { Organization } from '../../models/organization';

@Component({
  selector: 'app-repository-management',
  templateUrl: './repository-management.component.html',
  styleUrls: ['./repository-management.component.scss']
})
export class RepositoryManagementComponent implements OnInit {
  @ViewChild('repoModal') repoModal: any;
  
  repoForm: FormGroup;
  organizations: Organization[] = [];
  repositoryGroups: GroupRepoDTO[] = [];
  isLoading = false;
  error = '';
  success = '';
  editingGroup: GroupRepoDTO | null = null;

  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    private repositoryService: RepositoryService,
    private organizationService: OrganizationService
  ) {
    this.repoForm = this.fb.group({
      groupName: ['', [Validators.required, Validators.minLength(3)]],
      groupDescription: ['', Validators.required],
      groupType: ['private', Validators.required],
      organizationId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    console.log('Initializing repository management component');
    this.loadOrganizations();
    this.loadRepositoryGroups();
  }

  loadOrganizations(): void {
    console.log('Loading organizations...');
    this.organizationService.getAllOrganizations().subscribe({
      next: (data) => {
        console.log('Organizations loaded:', data);
        this.organizations = data;
      },
      error: (error) => {
        console.error('Error loading organizations:', error);
        this.error = error.message || 'Failed to load organizations';
      }
    });
  }

  loadRepositoryGroups(): void {
    console.log('Loading repository groups...');
    this.isLoading = true;
    this.error = '';
    this.repositoryService.getAllGroups().subscribe({
      next: (groups) => {
        console.log('Repository groups loaded:', groups);
        this.repositoryGroups = groups;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error loading repository groups:', error);
        this.error = error.message || 'Failed to load repository groups';
        this.isLoading = false;
      }
    });
  }

  openModal(content: any, group?: GroupRepoDTO): void {
    if (group) {
      console.log('Opening modal to edit group:', group);
      this.editingGroup = group;
      this.repoForm.patchValue({
        groupName: group.group_name,
        groupDescription: group.group_description,
        groupType: group.group_type,
        organizationId: group.organization?.id
      });
    } else {
      console.log('Opening modal to create new group');
      this.editingGroup = null;
      this.repoForm.reset({
        groupName: '',
        groupDescription: '',
        groupType: 'private',
        organizationId: ''
      });
    }
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit(): void {
    if (this.repoForm.invalid) {
      console.log('Form is invalid:', this.repoForm.errors);
      this.repoForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.success = '';

    const formValue = this.repoForm.value;
    console.log('Submitting form with values:', formValue);

    if (this.editingGroup) {
      console.log('Updating group:', this.editingGroup.id);
      this.repositoryService.updateGroup(this.editingGroup.id, formValue).subscribe({
        next: () => {
          console.log('Group updated successfully');
          this.success = 'Group updated successfully';
          this.loadRepositoryGroups();
          this.modalService.dismissAll();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error updating group:', error);
          this.error = error.message || 'Failed to update group';
          this.isLoading = false;
        }
      });
    } else {
      console.log('Creating new group');
      this.repositoryService.createGroup(formValue).subscribe({
        next: () => {
          console.log('Group created successfully');
          this.success = 'Group created successfully';
          this.loadRepositoryGroups();
          this.modalService.dismissAll();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error creating group:', error);
          this.error = error.message || 'Failed to create group';
          this.isLoading = false;
        }
      });
    }
  }

  deleteGroup(group: GroupRepoDTO): void {
    if (confirm(`Are you sure you want to delete ${group.group_name}?`)) {
      console.log('Deleting group:', group.id);
      this.isLoading = true;
      this.repositoryService.deleteGroup(group.id).subscribe({
        next: () => {
          console.log('Group deleted successfully');
          this.success = 'Group deleted successfully';
          this.loadRepositoryGroups();
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error deleting group:', error);
          this.error = error.message || 'Failed to delete group';
          this.isLoading = false;
        }
      });
    }
  }

  getOrganizationName(group: GroupRepoDTO): string {
    return group.organization ? group.organization.org_name : 'Unknown Organization';
  }
}