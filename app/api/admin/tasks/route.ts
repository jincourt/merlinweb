import { requireAdminAuth } from "@/lib/admin-auth";
import { createTask, getAdminTasks } from "@/lib/task-data";
import { TASK_STATUSES, type TaskInput, type TaskStatus } from "@/lib/task-types";
import { NextResponse } from "next/server";

function parseBody(body: Record<string, unknown>): TaskInput | null {
  const title = typeof body.title === "string" ? body.title : "";
  if (!title.trim()) return null;

  const status = body.status;
  const validStatus =
    typeof status === "string" && TASK_STATUSES.includes(status as TaskStatus)
      ? (status as TaskStatus)
      : undefined;

  return {
    title,
    description:
      typeof body.description === "string" ? body.description : undefined,
    dueDate:
      body.dueDate === null
        ? null
        : typeof body.dueDate === "string"
          ? body.dueDate
          : undefined,
    status: validStatus,
    position:
      typeof body.position === "number" ? body.position : undefined,
  };
}

export async function GET() {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const tasks = await getAdminTasks();
  return NextResponse.json({ tasks });
}

export async function POST(request: Request) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as Record<string, unknown>;
    const input = parseBody(body);

    if (!input) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const task = await createTask(input);
    return NextResponse.json({ task });
  } catch (error) {
    console.error("Task create error:", error);
    return NextResponse.json({ error: "Erreur." }, { status: 500 });
  }
}
