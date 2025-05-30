import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService, Group } from '../../services/user.service';
import { User, UserRequest, UserUpdateRequest } from '../../models/user';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-users-management',
  templateUrl: './users-management.component.html',
  styleUrls: ['./users-management.component.scss']
})
export class UsersManagementComponent implements OnInit {
  @ViewChild('userModal') userModal: any;
  @ViewChild('assignModal') assignModal: any;
  users: User[] = [];
  groups: Group[] = [];
  userForm: FormGroup;
  assignForm: FormGroup;
  editingUser: User | null = null;
  selectedUser: User | null = null;
  loading = false;
  error = '';
  success = '';

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.userForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.minLength(8)]],
      groupName: [''],
      githubUsername: [''],
      role: ['student', [Validators.required]],
      enabled: [true],
      locked: [false]
    });

    this.assignForm = this.formBuilder.group({
      groupId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
    this.loadGroups();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.loading = false;
        console.log('Loaded users:', users);
      },
      error: (error) => {
        this.error = error.message || 'Failed to load users';
        this.loading = false;
        console.error('Error loading users:', error);
      }
    });
  }

  loadGroups(): void {
    this.userService.getAllGroups().subscribe({
      next: (groups: Group[]) => {
        this.groups = groups;
        console.log('Loaded groups:', groups);
      },
      error: (error: any) => {
        this.error = error.message || 'Failed to load groups';
        console.error('Error loading groups:', error);
      }
    });
  }

  openModal(content: any, user?: User): void {
    if (user) {
      this.editingUser = user;
      this.userForm.patchValue({
        username: user.username,
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.email,
        githubUsername: user.githubUsername || '',
        groupName: user.groups.length > 0 ? user.groups[0].group_name : '',
        enabled: user.enabled,
        locked: user.locked,
        role: user.role || 'student'
      });
      this.userForm.get('password')?.setValidators([]);
      this.userForm.get('role')?.clearValidators();
    } else {
      this.editingUser = null;
      this.userForm.reset({
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        groupName: '',
        githubUsername: '',
        role: 'student',
        enabled: true,
        locked: false
      });
      this.userForm.get('password')?.setValidators([Validators.required, Validators.minLength(8)]);
      this.userForm.get('role')?.setValidators([Validators.required]);
    }
    this.userForm.updateValueAndValidity();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' });
  }

  onSubmit(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
      console.log('Form invalid:', this.userForm.errors, this.userForm.value);
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const formValue = this.userForm.value;
    console.log('Submitting form:', formValue);

    if (this.editingUser) {
      const updateData: UserUpdateRequest = {
        username: formValue.username,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        password: formValue.password || undefined,
        groupName: formValue.groupName || undefined,
        githubUsername: formValue.githubUsername || undefined,
        locked: formValue.locked,
        enabled: formValue.enabled
      };

      this.userService.updateUser(this.editingUser.id, updateData).subscribe({
        next: (response) => {
          this.success = 'User updated successfully';
          this.loadUsers();
          this.modalService.dismissAll();
          this.loading = false;
          console.log('Update response:', response);
        },
        error: (error) => {
          this.error = error.message || 'Failed to update user';
          this.loading = false;
          console.error('Error updating user:', error);
        }
      });
    } else {
      const userData: UserRequest = {
        username: formValue.username,
        firstName: formValue.firstName,
        lastName: formValue.lastName,
        email: formValue.email,
        password: formValue.password,
        groupName: formValue.groupName || undefined,
        githubUsername: formValue.githubUsername || undefined,
        role: formValue.role,
        locked: formValue.locked,
        enabled: formValue.enabled
      };

      console.log('Creating user with payload:', userData);
      this.userService.registerUser(userData).subscribe({
        next: (response) => {
          this.success = 'User created successfully';
          this.loadUsers();
          this.modalService.dismissAll();
          this.loading = false;
          console.log('Create response:', response);
        },
        error: (error) => {
          this.error = error.message || 'Failed to create user';
          this.loading = false;
          console.error('Error creating user:', error);
        }
      });
    }
  }

  deleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete user ${user.username}?`)) {
      this.loading = true;
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.success = 'User deleted successfully';
          this.loadUsers();
          this.loading = false;
        },
        error: (error) => {
          this.error = error.message || 'Failed to delete user';
          this.loading = false;
          console.error('Error deleting user:', error);
        }
      });
    }
  }

  addUserToGroup(user: User, groupId: number): void {
    this.loading = true;
    this.userService.addUserToGroup(user.id, groupId).subscribe({
      next: () => {
        this.success = `User ${user.username} added to group`;
        this.loadUsers();
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to add user to group';
        this.loading = false;
        console.error('Error adding user to group:', error);
      }
    });
  }

  removeUserFromGroup(user: User, groupName: string): void {
    this.loading = true;
    this.userService.removeUserFromGroup(user.id, groupName).subscribe({
      next: () => {
        this.success = `User ${user.username} removed from group ${groupName}`;
        this.loadUsers();
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to remove user from group';
        this.loading = false;
        console.error('Error removing user from group:', error);
      }
    });
  }

  openAssignModal(user: User): void {
    this.selectedUser = user;
    this.assignForm.reset();
    this.modalService.open(this.assignModal, { ariaLabelledBy: 'assign-modal-title' });
  }

  onAssignSubmit(): void {
    if (this.assignForm.invalid || !this.selectedUser) {
      return;
    }

    const groupId = this.assignForm.get('groupId')?.value;
    this.loading = true;
    this.userService.addUserToGroup(this.selectedUser.id, groupId).subscribe({
      next: () => {
        this.success = `User ${this.selectedUser?.username} assigned to group successfully`;
        this.loadUsers();
        this.modalService.dismissAll();
        this.loading = false;
      },
      error: (error) => {
        this.error = error.message || 'Failed to assign user to group';
        this.loading = false;
      }
    });
  }
}