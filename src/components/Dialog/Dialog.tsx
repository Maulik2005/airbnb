import { X } from "lucide-react";
import { useRef, type ReactNode, type RefObject } from "react";
import { useFocusTrap } from "../../hooks/useFocusTrap";
import styles from "./Dialog.module.css";

type DialogProps = {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
  returnFocusRef?: RefObject<HTMLElement | null>;
};

export function Dialog({ open, title, onClose, children, returnFocusRef }: DialogProps) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, open, returnFocusRef);

  if (!open) return null;

  return (
    <div className={styles.backdrop} onMouseDown={onClose}>
      <div
        className={styles.dialog}
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        tabIndex={-1}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <header>
          <h2 id="dialog-title">{title}</h2>
          <button type="button" data-autofocus aria-label="Close" onClick={onClose}><X size={18} /></button>
        </header>
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
}
