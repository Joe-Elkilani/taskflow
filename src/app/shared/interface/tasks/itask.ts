export interface Itask {
  id: number;
  taskName: string;
  project: string;
  dueDate: string;
  priority: string;
  status: string;
  description: string;
  projectId: number;
  assignedToUserId: number;
  assignedToName: string;
  createdAt: string;
  updatedAt: string;
}
