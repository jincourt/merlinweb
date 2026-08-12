"use client";

import { useState } from "react";
import { NoteDialog } from "./note-dialog";

export function LeaveNoteLink() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="mt-1.5 text-sm text-white/45 underline-offset-2 transition-colors hover:text-white hover:underline"
      >
        Laisser une note
      </button>
      <NoteDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
