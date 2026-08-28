"use client";

import { useIntlayer } from "next-intlayer";
import { useState } from "react";
import { NoteDialog } from "./note-dialog";

export function LeaveNoteLink({ tone = "dark" }: { tone?: "dark" | "light" }) {
  const [open, setOpen] = useState(false);
  const site = useIntlayer("site");
  const linkClass =
    tone === "light"
      ? "mt-1.5 text-sm text-black/45 underline-offset-2 transition-colors hover:text-black hover:underline"
      : "mt-1.5 text-sm text-white/45 underline-offset-2 transition-colors hover:text-white hover:underline";

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={linkClass}>
        {site.leaveNote}
      </button>
      <NoteDialog open={open} onClose={() => setOpen(false)} />
    </>
  );
}
