import { Organization } from './organization';

export interface GroupRepoDTO {
  id: number;
  group_name: string;
  group_description: string;
  group_type: string;
  organization: Organization | null;
}

export interface User {
  id: number;
  keycloakId: string | null;
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  locked: boolean;
  enabled: boolean;
  githubUsername: string | null;
  groups: GroupRepoDTO[];
  roles?: ('STUDENT' | 'TEACHER' | 'ADMIN' | 'FIELD_MANAGER')[];
  teacherGroups?: GroupRepoDTO[];
  managedOrganizations?: Organization[];
  role?: string;
}

export interface UserRequest {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  locked?: boolean;
  enabled?: boolean;
  groupName?: string;
  githubUsername?: string;
  role?: string;
}

export interface UserUpdateRequest {
  username?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  groupName?: string;
  locked?: boolean;
  enabled?: boolean;
  githubUsername?: string;
}