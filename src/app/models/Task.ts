// models/task.model.ts
export interface Task {
  id?: number;
  name: string;
  description: string;
  repositoryName: string;
  branchName: string;
  author: string;
  status: 'TO_DO' | 'IN_PROGRESS' | 'DONE';
}
