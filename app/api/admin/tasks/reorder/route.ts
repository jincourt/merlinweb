import { requireAdminAuth } from "@/lib/admin-auth";
import { reorderTasks } from "@/lib/task-data";
import { TASK_STATUSES, type TaskStatus } from "@/lib/task-types";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!(await requireAdminAuth())) {
    return NextResponse.json({ error: "Non autorisé." }, { status: 401 });
  }

  try {
    const body = (await request.json()) as { updates?: unknown };
    if (!Array.isArray(body.updates)) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const updates = body.updates
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const row = item as Record<string, unknown>;
        const id = typeof row.id === "string" ? row.id : "";
        const status = row.status;
        const position = Number(row.position);

        if (
          !id ||
          typeof status !== "string" ||
          !TASK_STATUSES.includes(status as TaskStatus) ||
          Number.isNaN(position)
        ) {
          return null;
        }

        return {
          id,
          status: status as TaskStatus,
          position,
        };
      })
      .filter(Boolean) as { id: string; status: TaskStatus; position: number }[];

    if (updates.length === 0) {
      return NextResponse.json({ error: "Données invalides." }, { status: 400 });
    }

    const tasks = await reorderTasks(updates);
    return NextResponse.json({ tasks });
  } catch (error) {
    console.error("Task reorder error:", error);
    return NextResponse.json({ error: "Erreur." }, { status: 500 });
  }
}
