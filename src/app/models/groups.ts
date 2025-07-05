export interface GroupRepoDTO {
    id: number;
    group_name: string;
    group_description: string;
    group_type: string;
    organization: Organization | null;
  }
  
  export interface Organization {
    id: number;
    org_name: string;
    org_email: string;
    org_owner: string;
    classRoomId: number | null;
    groupRepos: GroupRepoDTO[];
  }
  
  export interface GroupRepoRequest {
    group_name: string;
    group_description: string;
    group_type: string;
    organizationId: number;
  }