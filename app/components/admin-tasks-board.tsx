"use client";

import { useCallback, useMemo, useState, type DragEvent } from "react";
import { Calendar, GripVertical, Plus, Trash2, X } from "lucide-react";
import {
  TASK_STATUSES,
  TASK_STATUS_LABELS,
  type TaskRecord,
  type TaskStatus,
} from "@/lib/task-types";

type AdminTasksBoardProps = {
  initialTasks: TaskRecord[];
};

type TaskFormState = {
  title: string;
  description: string;
  dueDate: string;
  status: TaskStatus;
};

const inputClass =
  "block w-full rounded-lg border border-border bg-white px-3 py-2.5 text-sm text-black outline-none transition-colors focus:border-black/30";

const labelClass = "t-mono !text-black/70 !text-[0.625rem]";

function emptyForm(status: TaskStatus = "todo"): TaskFormState {
  return { title: "", description: "", dueDate: "", status };
}

function formatDueDate(date: string | null) {
  if (!date) return null;
  return new Intl.DateTimeFormat("fr-CH", { dateStyle: "medium" }).format(
    new Date(`${date}T12:00:00`),
  );
}

function isOverdue(date: string | null, status: TaskStatus) {
  if (!date || status === "done") return false;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const due = new Date(`${date}T12:00:00`);
  return due < today;
}

function groupByStatus(tasks: TaskRecord[]) {
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

export function AdminTasksBoard({ initialTasks }: AdminTasksBoardProps) {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [dropTarget, setDropTarget] = useState<{
    status: TaskStatus;
    index: number;
  } | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState<TaskFormState>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const grouped = useMemo(() => groupByStatus(tasks), [tasks]);

  const openCreate = useCallback((status: TaskStatus = "todo") => {
    setEditingId(null);
    setForm(emptyForm(status));
    setError(null);
    setModalOpen(true);
  }, []);

  const openEdit = useCallback((task: TaskRecord) => {
    setEditingId(task.id);
    setForm({
      title: task.title,
      description: task.description,
      dueDate: task.due_date ?? "",
      status: task.status,
    });
    setError(null);
    setModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
    setEditingId(null);
    setError(null);
  }, []);

  async function handleSave() {
    if (!form.title.trim()) {
      setError("Le titre est requis.");
      return;
    }

    setSaving(true);
    setError(null);

    const payload = {
      title: form.title,
      description: form.description,
      dueDate: form.dueDate || null,
      status: form.status,
    };

    try {
      const res = await fetch(
        editingId ? `/api/admin/tasks/${editingId}` : "/api/admin/tasks",
        {
          method: editingId ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );

      const data = (await res.json()) as { task?: TaskRecord; error?: string };

      if (!res.ok) {
        setError(data.error ?? "Erreur lors de l'enregistrement.");
        return;
      }

      if (data.task) {
        setTasks((prev) => {
          const without = prev.filter((t) => t.id !== data.task!.id);
          return [...without, data.task!].sort((a, b) => {
            if (a.status !== b.status) {
              return TASK_STATUSES.indexOf(a.status) - TASK_STATUSES.indexOf(b.status);
            }
            return a.position - b.position;
          });
        });
      }

      closeModal();
    } catch {
      setError("Erreur réseau.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Supprimer cette tâche ?")) return;

    try {
      const res = await fetch(`/api/admin/tasks/${id}`, { method: "DELETE" });
      if (!res.ok) return;
      setTasks((prev) => prev.filter((t) => t.id !== id));
      closeModal();
    } catch {
      /* ignore */
    }
  }

  function buildReorderUpdates(
    sourceId: string,
    targetStatus: TaskStatus,
    targetIndex: number,
  ) {
    const source = tasks.find((t) => t.id === sourceId);
    if (!source) return null;

    const nextGrouped = groupByStatus(tasks);
    const sourceList = nextGrouped[source.status].filter((t) => t.id !== sourceId);
    nextGrouped[source.status] = sourceList;

    const targetList = [...nextGrouped[targetStatus]];
    targetList.splice(targetIndex, 0, { ...source, status: targetStatus });
    nextGrouped[targetStatus] = targetList;

    const updates: { id: string; status: TaskStatus; position: number }[] = [];

    for (const status of TASK_STATUSES) {
      nextGrouped[status].forEach((task, index) => {
        updates.push({ id: task.id, status, position: index });
      });
    }

    return updates;
  }

  async function handleDrop(
    sourceId: string,
    targetStatus: TaskStatus,
    targetIndex: number,
  ) {
    const updates = buildReorderUpdates(sourceId, targetStatus, targetIndex);
    if (!updates) return;

    const optimistic = updates.reduce(
      (acc, u) => {
        const task = tasks.find((t) => t.id === u.id);
        if (task) acc.push({ ...task, status: u.status, position: u.position });
        return acc;
      },
      [] as TaskRecord[],
    );

    setTasks(optimistic);

    try {
      const res = await fetch("/api/admin/tasks/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updates }),
      });

      if (!res.ok) {
        setTasks(initialTasks);
        return;
      }

      const data = (await res.json()) as { tasks?: TaskRecord[] };
      if (data.tasks) setTasks(data.tasks);
    } catch {
      setTasks(tasks);
    }
  }

  function onDragStart(e: DragEvent, taskId: string) {
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", taskId);
    setDraggingId(taskId);
  }

  function onDragEnd() {
    setDraggingId(null);
    setDropTarget(null);
  }

  function onColumnDragOver(e: DragEvent, status: TaskStatus) {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropTarget({ status, index: grouped[status].length });
  }

  function onCardDragOver(
    e: DragEvent,
    status: TaskStatus,
    index: number,
  ) {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = "move";
    setDropTarget({ status, index });
  }

  async function onColumnDrop(e: DragEvent, status: TaskStatus) {
    e.preventDefault();
    const sourceId = e.dataTransfer.getData("text/plain");
    if (!sourceId) return;

    const index =
      dropTarget?.status === status ? dropTarget.index : grouped[status].length;

    await handleDrop(sourceId, status, index);
    onDragEnd();
  }

  return (
    <>
      <div className="admin-tasks-board">
        {TASK_STATUSES.map((status) => (
          <section
            key={status}
            className={`admin-tasks-column${dropTarget?.status === status && draggingId ? " admin-tasks-column-active" : ""}`}
            onDragOver={(e) => onColumnDragOver(e, status)}
            onDrop={(e) => onColumnDrop(e, status)}
          >
            <header className="admin-tasks-column-header">
              <div className="admin-tasks-column-title">
                <span className="t-mono !text-black/70">{TASK_STATUS_LABELS[status]}</span>
                <span className="admin-tasks-count">{grouped[status].length}</span>
              </div>
              <button
                type="button"
                className="admin-tasks-add-btn"
                onClick={() => openCreate(status)}
                aria-label={`Ajouter une tâche — ${TASK_STATUS_LABELS[status]}`}
              >
                <Plus size={14} strokeWidth={1.75} />
              </button>
            </header>

            <div className="admin-tasks-cards">
              {grouped[status].map((task, index) => {
                const dueLabel = formatDueDate(task.due_date);
                const overdue = isOverdue(task.due_date, task.status);

                return (
                  <article
                    key={task.id}
                    draggable
                    onDragStart={(e) => onDragStart(e, task.id)}
                    onDragEnd={onDragEnd}
                    onDragOver={(e) => onCardDragOver(e, status, index)}
                    onDrop={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      const sourceId = e.dataTransfer.getData("text/plain");
                      if (!sourceId) return;
                      await handleDrop(sourceId, status, index);
                      onDragEnd();
                    }}
                    onClick={() => openEdit(task)}
                    className={`admin-task-card${draggingId === task.id ? " admin-task-card-dragging" : ""}${dropTarget?.status === status && dropTarget.index === index && draggingId ? " admin-task-card-drop-before" : ""}`}
                  >
                    <div className="admin-task-card-top">
                      <GripVertical
                        size={14}
                        strokeWidth={1.75}
                        className="admin-task-grip"
                        aria-hidden
                      />
                      <h3 className="admin-task-card-title">{task.title}</h3>
                    </div>

                    {task.description && (
                      <p className="admin-task-card-desc">{task.description}</p>
                    )}

                    {dueLabel && (
                      <div
                        className={`admin-task-card-date${overdue ? " admin-task-card-date-overdue" : ""}`}
                      >
                        <Calendar size={12} strokeWidth={1.75} aria-hidden />
                        {dueLabel}
                      </div>
                    )}
                  </article>
                );
              })}

              {grouped[status].length === 0 && (
                <div className="admin-tasks-column-empty">
                  Glissez une tâche ici
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {modalOpen && (
        <div className="admin-tasks-modal-backdrop" onClick={closeModal}>
          <div
            className="admin-tasks-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="task-modal-title"
          >
            <header className="admin-tasks-modal-header">
              <span id="task-modal-title" className="t-mono !text-black/70">
                {editingId ? "Modifier" : "Nouvelle tâche"}
              </span>
              <button
                type="button"
                className="admin-tasks-modal-close"
                onClick={closeModal}
                aria-label="Fermer"
              >
                <X size={18} strokeWidth={1.75} />
              </button>
            </header>

            {error && <p className="admin-invoice-error">{error}</p>}

            <div className="admin-invoice-fields">
              <label className="admin-invoice-field admin-invoice-field-full">
                <span className={labelClass}>Titre</span>
                <input
                  type="text"
                  className={inputClass}
                  value={form.title}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, title: e.target.value }))
                  }
                  placeholder="Ex. Relancer le client Dupont"
                  autoFocus
                />
              </label>

              <label className="admin-invoice-field admin-invoice-field-full">
                <span className={labelClass}>Description</span>
                <textarea
                  className={`${inputClass} min-h-[5rem] resize-y`}
                  value={form.description}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, description: e.target.value }))
                  }
                  placeholder="Détails, notes…"
                  rows={3}
                />
              </label>

              <label className="admin-invoice-field">
                <span className={labelClass}>Date</span>
                <input
                  type="date"
                  className={inputClass}
                  value={form.dueDate}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, dueDate: e.target.value }))
                  }
                />
              </label>

              <label className="admin-invoice-field">
                <span className={labelClass}>Statut</span>
                <select
                  className={inputClass}
                  value={form.status}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      status: e.target.value as TaskStatus,
                    }))
                  }
                >
                  {TASK_STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {TASK_STATUS_LABELS[s]}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <footer className="admin-tasks-modal-footer">
              {editingId && (
                <button
                  type="button"
                  className="admin-tasks-delete-btn"
                  onClick={() => handleDelete(editingId)}
                  disabled={saving}
                >
                  <Trash2 size={14} strokeWidth={1.75} />
                  Supprimer
                </button>
              )}
              <div className="admin-tasks-modal-actions">
                <button
                  type="button"
                  className="btn-outline"
                  onClick={closeModal}
                  disabled={saving}
                >
                  Annuler
                </button>
                <button
                  type="button"
                  className="btn-primary"
                  onClick={handleSave}
                  disabled={saving}
                >
                  {saving ? "Enregistrement…" : "Enregistrer"}
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </>
  );
}
