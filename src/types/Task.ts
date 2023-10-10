export interface Status {
  id: number;
  name: string;
  tasks: Task[];
}

export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string;
}

export interface SelectedTask {
  taskId: number | null;
  statusId: number | null;
}
