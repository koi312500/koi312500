import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { ExternalLink, Trophy, X } from "lucide-react";
import type { Language } from "../lib/navigation";
import type { Project } from "../types";

type CaseStudyDialogProps = {
  project: Project;
  language: Language;
  onClose: () => void;
};

export function CaseStudyDialog({
  project,
  language,
  onClose,
}: CaseStudyDialogProps) {
  const outcomeIsAward =
    project.award?.[language] === project.outcome[language];
  const closeButton = useRef<HTMLButtonElement>(null);
  const dialog = useRef<HTMLElement>(null);
  const previousFocus = useRef<HTMLElement | null>(
    document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null,
  );

  useEffect(() => {
    const appRoot = document.getElementById("root");
    appRoot?.setAttribute("inert", "");
    closeButton.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const focusable = dialog.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusable?.length) return;

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      appRoot?.removeAttribute("inert");
      previousFocus.current?.focus();
    };
  }, [onClose]);

  return createPortal(
    <div className="dialog-backdrop" role="presentation" onMouseDown={onClose}>
      <section
        ref={dialog}
        className="case-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="case-dialog-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <button
          className="dialog-close"
          type="button"
          onClick={onClose}
          ref={closeButton}
          aria-label={
            language === "en" ? "Close project details" : "프로젝트 상세 닫기"
          }
        >
          <X aria-hidden="true" />
        </button>
        <p className="dialog-eyebrow">{project.category[language]}</p>
        <h2 id="case-dialog-title">{project.title[language]}</h2>
        <div className="dialog-meta">
          <span>{project.role[language]}</span>
          <span>{project.period}</span>
        </div>
        <div className="dialog-description">
          <span>{language === "en" ? "Project overview" : "프로젝트 개요"}</span>
          <p className="dialog-summary">{project.summary[language]}</p>
        </div>
        <strong className="dialog-outcome">{project.outcome[language]}</strong>
        {project.award && !outcomeIsAward ? (
          <p className="dialog-award">
            <Trophy aria-hidden="true" />
            <span>{project.award[language]}</span>
          </p>
        ) : null}
        {project.details.map((detail, index) => (
          <p key={index}>{detail[language]}</p>
        ))}
        <div className="dialog-stack">
          {project.stack.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
        {project.github ? (
          <a
            className="dialog-link"
            href={project.github}
            target="_blank"
            rel="noreferrer"
          >
            GitHub <ExternalLink aria-hidden="true" />
          </a>
        ) : null}
      </section>
    </div>,
    document.body,
  );
}
