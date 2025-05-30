import { GroupRepoDTO} from "./user";
export interface OrganizationRequest {
  org_name: string;
  org_email: string;
  org_owner: string;
}

export interface Organization {
  id: number;
  org_name: string;
  org_email: string;
  org_owner: string;
  classRoomId: number | null;
  groupRepos: GroupRepoDTO[];
}