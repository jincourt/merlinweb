import { requireAdminAuth } from "@/lib/admin-auth";
import { deleteTask, getAdminTask, updateTask } from "@/lib/task-data";
import { TASK_STATUSES, type TaskInput, type TaskStatus } from "@/lib/task-types";
import { NextResponse } from "next/server";

type RouteContext = { params: Promise<{ id: string }> };

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

export async function GET(_request: Request, context: RouteContext) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  const { id } = await context.params;
  const task = await getAdminTask(id);

  if (!task) {
    return NextResponse.json({ error: "Introuvable." }, { status: 404 });
  }

  return NextResponse.json({ task });
}

export async function PATCH(request: Request, context: RouteContext) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    const body = (await request.json()) as Record<string, unknown>;
    const input = parseBody(body);

    if (!input) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const task = await updateTask(id, input);
    return NextResponse.json({ task });
  } catch (error) {
    console.error("Task update error:", error);
    return NextResponse.json({ error: "Erreur." }, { status: 500 });
  }
}

export async function DELETE(_request: Request, context: RouteContext) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const { id } = await context.params;
    await deleteTask(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Task delete error:", error);
    return NextResponse.json({ error: "Erreur." }, { status: 500 });
  }
}
