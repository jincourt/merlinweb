import { AdminTasksBoard } from "@/app/components/admin-tasks-board";
import { getAdminTasks } from "@/lib/task-data";

export const dynamic = "force-dynamic";

export default async function AdminTachesPage() {
  const tasks = await getAdminTasks();

  return (
    <>
      <header className="admin-page-header admin-page-header-row">
        <div>
          <span className="t-mono !text-black/70">Tâches</span>
          <h1 className="t-display mt-2 text-[clamp(1.75rem,3vw,2.25rem)] text-black">
            Tableau de bord
          </h1>
          <p className="t-body mt-3 max-w-xl">
            {tasks.length} tâche{tasks.length !== 1 ? "s" : ""} — glissez-déposez
            pour changer le statut.
          </p>
        </div>
      </header>

      <AdminTasksBoard initialTasks={tasks} />
    </>
  );
}
