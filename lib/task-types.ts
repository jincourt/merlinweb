export type TaskStatus = "todo" | "in_progress" | "done";

export type TaskRecord = {
  id: string;
  title: string;
  description: string;
  due_date: string | null;
  status: TaskStatus;
  position: number;
  created_at: string;
  updated_at: string;
};

export type TaskInput = {
  title: string;
  description?: string;
  dueDate?: string | null;
  status?: TaskStatus;
  position?: number;
};

export const TASK_STATUSES: TaskStatus[] = ["todo", "in_progress", "done"];

export const TASK_STATUS_LABELS: Record<TaskStatus, string> = {
  todo: "À faire",
  in_progress: "En cours",
  done: "Terminé",
};
