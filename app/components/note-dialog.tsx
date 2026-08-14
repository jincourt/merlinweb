"use client";

import { useEffect, useRef, useState } from "react";
import { Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

type NoteDialogProps = {
  open: boolean;
  onClose: () => void;
};

export function NoteDialog({ open, onClose }: NoteDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [stars, setStars] = useState(0);
  const [hover, setHover] = useState(0);
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    if (open && !el.open) {
      el.showModal();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  function resetForm() {
    setStars(0);
    setHover(0);
    setName("");
    setComment("");
    setStatus("idle");
    setErrorMsg("");
  }

  function handleClose() {
    resetForm();
    onClose();
  }

  async function submit() {
    if (stars < 1) {
      setErrorMsg("Sélectionnez au moins une étoile.");
      setStatus("error");
      return;
    }

    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/note", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ stars, name, comment }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data.error ?? "Erreur lors de l'envoi.");
        return;
      }

      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Erreur réseau. Réessayez.");
    }
  }

  const active = hover || stars;

  return (
    <AnimatePresence>
      {open && (
        <dialog
          ref={dialogRef}
          className="invite-dialog"
          onClose={handleClose}
          onClick={(e) => {
            if (e.target === dialogRef.current) handleClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="invite-dialog-panel"
            onClick={(e) => e.stopPropagation()}
          >
            {status === "success" ? (
              <>
                <p className="t-mono !text-black">Merci</p>
                <h2 className="t-display mt-4 text-2xl sm:text-3xl text-black">
                  Note envoyée
                  <span className="text-red">.</span>
                </h2>
                <p className="t-body mt-4">
                  Votre avis a bien été transmis à notre équipe.
                </p>
                <button
                  type="button"
                  onClick={handleClose}
                  className="btn-primary mt-8 w-full justify-center"
                >
                  Fermer
                </button>
              </>
            ) : (
              <>
                <p className="t-mono !text-black">Votre avis</p>
                <h2 className="t-display mt-4 text-2xl sm:text-3xl text-black">
                  Laisser une note
                  <span className="text-red">.</span>
                </h2>
                <p className="t-body mt-4">
                  Comment s&apos;est passée votre expérience avec Merlin ?
                </p>

                <div
                  className="mt-6 flex justify-center gap-1"
                  role="radiogroup"
                  aria-label="Note sur 5 étoiles"
                  onMouseLeave={() => setHover(0)}
                >
                  {[1, 2, 3, 4, 5].map((value) => (
                    <button
                      key={value}
                      type="button"
                      role="radio"
                      aria-checked={stars === value}
                      aria-label={`${value} étoile${value > 1 ? "s" : ""}`}
                      className="rounded p-1 transition-transform hover:scale-110"
                      onMouseEnter={() => setHover(value)}
                      onClick={() => setStars(value)}
                    >
                      <Star
                        size={28}
                        strokeWidth={1.5}
                        fill={value <= active ? "currentColor" : "none"}
                        className={
                          value <= active ? "text-red" : "text-muted"
                        }
                        aria-hidden="true"
                      />
                    </button>
                  ))}
                </div>

                <label htmlFor="note-name" className="t-mono mt-8 block">
                  Nom ou Entreprise
                </label>
                <input
                  id="note-name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Votre nom ou raison sociale"
                  maxLength={120}
                  autoComplete="name"
                  className="wizard-input mt-3"
                  disabled={status === "loading"}
                />

                <label htmlFor="note-comment" className="t-mono mt-5 block">
                  Commentaire
                </label>
                <textarea
                  id="note-comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Partagez votre expérience…"
                  rows={4}
                  maxLength={2000}
                  className="wizard-input mt-3 resize-none"
                  disabled={status === "loading"}
                />

                {errorMsg && (
                  <p className="mt-3 text-sm text-error" role="alert">
                    {errorMsg}
                  </p>
                )}

                <button
                  type="button"
                  onClick={submit}
                  disabled={status === "loading"}
                  className="btn-primary mt-8 w-full justify-center disabled:opacity-50"
                >
                  {status === "loading" ? "Envoi…" : "Envoyer"}
                </button>
              </>
            )}
          </motion.div>
        </dialog>
      )}
    </AnimatePresence>
  );
}
