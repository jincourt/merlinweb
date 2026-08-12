"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

type InviteDialogProps = {
  code: string;
  open: boolean;
  onClose: () => void;
};

export function InviteDialog({ code, open, onClose }: InviteDialogProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const el = dialogRef.current;
    if (!el) return;

    if (open && !el.open) {
      el.showModal();
    } else if (!open && el.open) {
      el.close();
    }
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <dialog
          ref={dialogRef}
          className="invite-dialog"
          onClose={onClose}
          onClick={(e) => {
            if (e.target === dialogRef.current) onClose();
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
            <p className="t-mono !text-black">Invitation Merlin</p>
            <h2 className="t-display mt-4 text-2xl sm:text-3xl text-black">
              Vous avez été invité
              <span className="text-red">.</span>
            </h2>
            <p className="t-body mt-4">
              Un proche vous invite à configurer votre site professionnel.
              Votre code d&apos;invitation sera associé à votre demande de devis
              — le parrain recevra{" "}
              <span className="font-medium text-black">50.- CHF</span> une fois
              votre projet confirmé.
            </p>
            <div className="mt-6 rounded-xl border border-border bg-gray-bg px-5 py-4 text-center">
              <p className="t-mono !text-black/70">Votre code</p>
              <p className="mt-2 font-mono text-2xl font-medium tracking-[0.2em] text-red">
                {code}
              </p>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="btn-primary mt-8 w-full justify-center"
            >
              OK
            </button>
          </motion.div>
        </dialog>
      )}
    </AnimatePresence>
  );
}
