import { createServiceSupabase } from "@/lib/supabase";
import {
  TASK_STATUSES,
  type TaskInput,
  type TaskRecord,
  type TaskStatus,
} from "@/lib/task-types";

function rowToRecord(row: Record<string, unknown>): TaskRecord {
  return {
    id: String(row.id),
    title: String(row.title),
    description: String(row.description ?? ""),
    due_date: (row.due_date as string | null) ?? null,
    status: row.status as TaskStatus,
    position: Number(row.position ?? 0),
    created_at: String(row.created_at),
    updated_at: String(row.updated_at),
  };
}

async function nextPosition(status: TaskStatus): Promise<number> {
  const supabase = createServiceSupabase();
  const { data, error } = await supabase
    .from("task")
    .select("position")
    .eq("status", status)
    .order("position", { ascending: false })
    .limit(1);

  if (error) throw error;
  return (data?.[0]?.position ?? -1) + 1;
}

export async function getAdminTasks(): Promise<TaskRecord[]> {
  const supabase = createServiceSupabase();
  const { data, error } = await supabase
    .from("task")
    .select("*")
    .order("status")
    .order("position", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) throw error;
  return (data ?? []).map((row) => rowToRecord(row as Record<string, unknown>));
}

export async function getAdminTask(id: string): Promise<TaskRecord | null> {
  const supabase = createServiceSupabase();
  const { data, error } = await supabase
    .from("task")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return rowToRecord(data as Record<string, unknown>);
}

export async function createTask(input: TaskInput): Promise<TaskRecord> {
  const supabase = createServiceSupabase();
  const status = input.status ?? "todo";
  const position =
    input.position ?? (await nextPosition(status));

  const { data, error } = await supabase
    .from("task")
    .insert({
      title: input.title.trim(),
      description: input.description?.trim() ?? "",
      due_date: input.dueDate || null,
      status,
      position,
    })
    .select("*")
    .single();

  if (error) throw error;
  return rowToRecord(data as Record<string, unknown>);
}

export async function updateTask(
  id: string,
  input: TaskInput,
): Promise<TaskRecord> {
  const supabase = createServiceSupabase();
  const existing = await getAdminTask(id);
  if (!existing) throw new Error("Task not found");

  const status = input.status ?? existing.status;
  let position = input.position ?? existing.position;

  if (status !== existing.status && input.position === undefined) {
    position = await nextPosition(status);
  }

  const { data, error } = await supabase
    .from("task")
    .update({
      title: input.title.trim(),
      description: input.description?.trim() ?? "",
      due_date: input.dueDate === undefined ? existing.due_date : input.dueDate || null,
      status,
      position,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id)
    .select("*")
    .single();

  if (error) throw error;
  return rowToRecord(data as Record<string, unknown>);
}

export async function updateTaskStatus(
  id: string,
  status: TaskStatus,
  position?: number,
): Promise<TaskRecord> {
  const existing = await getAdminTask(id);
  if (!existing) throw new Error("Task not found");

  return updateTask(id, {
    title: existing.title,
    description: existing.description,
    dueDate: existing.due_date,
    status,
    position: position ?? (await nextPosition(status)),
  });
}

export async function reorderTasks(
  updates: { id: string; status: TaskStatus; position: number }[],
): Promise<TaskRecord[]> {
  const supabase = createServiceSupabase();
  const now = new Date().toISOString();

  for (const item of updates) {
    const { error } = await supabase
      .from("task")
      .update({
        status: item.status,
        position: item.position,
        updated_at: now,
      })
      .eq("id", item.id);

    if (error) throw error;
  }

  return getAdminTasks();
}

export async function deleteTask(id: string): Promise<void> {
  const supabase = createServiceSupabase();
  const { error } = await supabase.from("task").delete().eq("id", id);
  if (error) throw error;
}

export function groupTasksByStatus(tasks: TaskRecord[]) {
  return TASK_STATUSES.reduce(
    (acc, status) => {
      acc[status] = tasks
        .filter((t) => t.status === status)
        .sort((a, b) => a.position - b.position);
      return acc;
    },
    {} as Record<TaskStatus, TaskRecord[]>,
  );
}
